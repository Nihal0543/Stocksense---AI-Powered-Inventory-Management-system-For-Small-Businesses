import os
from datetime import datetime
from sqlalchemy.orm import Session
from app.database.models import User, Product, Inventory, Sale, Forecast, Recommendation
from app.routers.auth import get_password_hash

def auto_seed_db(db: Session):
    """
    Automatically verifies that the default store manager and initial
    Kirana catalog exist. If the database is fresh/empty or contains legacy
    non-Kirana products (e.g., Electronics, TVs), it automatically wipes
    legacy records and populates authentic Indian Kirana products,
    stock inventories, sales histories, and re-trains the ML forecasting models.
    """
    try:
        # 1. Ensure Store Manager account exists
        manager = db.query(User).filter(User.email == "manager@retailstore.com").first()
        if not manager:
            manager = User(
                name="Store Manager",
                email="manager@retailstore.com",
                password=get_password_hash("password123")
            )
            db.add(manager)
            db.commit()
            print("[Auto-Seed] Created default Store Manager account (manager@retailstore.com / password123)")

        # 2. Check for legacy non-Kirana items or empty product table
        legacy_products = db.query(Product).filter(
            (Product.sku.like("ELEC%")) | 
            (Product.sku.like("APP%")) | 
            (Product.sku.like("HOME%")) |
            (Product.product_name.like("%LED TV%")) |
            (Product.product_name.like("%Office Chair%"))
        ).all()

        product_count = db.query(Product).count()

        if legacy_products or product_count == 0:
            if legacy_products:
                print(f"[Auto-Seed] Detected {len(legacy_products)} legacy non-Kirana products. Replacing with authentic Kirana catalog...")
                # Clear legacy recommendations, forecasts, sales, inventories, products
                db.query(Recommendation).delete()
                db.query(Forecast).delete()
                db.query(Sale).delete()
                db.query(Inventory).delete()
                db.query(Product).delete()
                db.commit()
            else:
                print("[Auto-Seed] Empty product table detected. Ingesting Kirana store catalog...")

            # Look for sample_retail_data.csv in possible paths
            possible_paths = [
                os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data", "sample_retail_data.csv"),
                os.path.join("data", "sample_retail_data.csv"),
                os.path.join("backend", "data", "sample_retail_data.csv")
            ]
            csv_path = next((p for p in possible_paths if os.path.exists(p)), None)
            
            if csv_path:
                import pandas as pd
                df = pd.read_csv(csv_path)
                sku_to_product_id = {}
                processed_inventories = set()
                sales_count = 0

                for _, row in df.iterrows():
                    sku = str(row['sku']).strip()
                    if sku not in sku_to_product_id:
                        prod = Product(
                            sku=sku,
                            product_name=str(row['product_name']).strip(),
                            category=str(row['category']).strip(),
                            supplier=str(row['supplier']).strip(),
                            price=float(row['price'])
                        )
                        db.add(prod)
                        db.commit()
                        db.refresh(prod)
                        sku_to_product_id[sku] = prod.id

                    pid = sku_to_product_id[sku]

                    if pid not in processed_inventories:
                        inv = Inventory(
                            product_id=pid,
                            current_stock=int(row['current_stock']),
                            reorder_level=int(row['reorder_level']),
                            warehouse=str(row['warehouse']).strip()
                        )
                        db.add(inv)
                        processed_inventories.add(pid)

                    # Add sale
                    sale_date = datetime.strptime(str(row['sale_date']), "%Y-%m-%d").date()
                    sale = Sale(
                        product_id=pid,
                        quantity=int(row['quantity']),
                        sale_date=sale_date,
                        revenue=float(row['revenue'])
                    )
                    db.add(sale)
                    sales_count += 1

                db.commit()
                print(f"[Auto-Seed] Successfully loaded {len(sku_to_product_id)} authentic Kirana products and {sales_count} sales transactions.")

                # Train forecasting model and generate recommendations
                try:
                    from app.services.forecast_service import forecast_service
                    from app.services.recommendation import recommendation_service
                    print("[Auto-Seed] Training XGBoost demand forecasting model on Kirana dataset...")
                    forecast_service.train_model(db)
                    print("[Auto-Seed] Generating initial AI recommendations for Kirana inventory...")
                    recommendation_service.generate_recommendations(db)
                    print("[Auto-Seed] Kirana database initialization complete.")
                except Exception as ml_err:
                    print(f"[Auto-Seed] Warning: ML initialization deferred: {ml_err}")
            else:
                print("[Auto-Seed] Warning: sample_retail_data.csv not found for seeding.")
    except Exception as e:
        print(f"[Auto-Seed] Warning during database seeding: {e}")
        db.rollback()
