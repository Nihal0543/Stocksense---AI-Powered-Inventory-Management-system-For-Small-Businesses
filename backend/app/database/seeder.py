import os
from datetime import datetime
from sqlalchemy.orm import Session
from app.database.models import User, Product, Inventory, Sale, Forecast, Recommendation
from app.routers.auth import get_password_hash

def auto_seed_db(db: Session):
    """
    Automatically verifies that the default store manager and initial
    catalog exist. If the database is fresh/empty (e.g. on Render or Docker),
    it automatically populates initial products, inventory, sales, and trains ML models.
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

        # 2. Check if products exist; if not, ingest sample_retail_data.csv
        product_count = db.query(Product).count()
        if product_count == 0:
            print("[Auto-Seed] Empty product table detected. Ingesting sample dataset...")
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
                    sku = row['sku']
                    if sku not in sku_to_product_id:
                        prod = Product(
                            sku=sku,
                            product_name=row['product_name'],
                            category=row['category'],
                            supplier=row['supplier'],
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
                            warehouse=str(row['warehouse'])
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
                print(f"[Auto-Seed] Successfully loaded {len(sku_to_product_id)} products and {sales_count} sales transactions.")

                # Train forecasting model and generate recommendations
                try:
                    from app.services.forecast_service import forecast_service
                    from app.services.recommendation import recommendation_service
                    print("[Auto-Seed] Training XGBoost demand forecasting model...")
                    forecast_service.train_model(db)
                    print("[Auto-Seed] Generating initial AI recommendations...")
                    recommendation_service.generate_recommendations(db)
                    print("[Auto-Seed] Initialization complete.")
                except Exception as ml_err:
                    print(f"[Auto-Seed] Warning: ML initialization deferred: {ml_err}")
            else:
                print("[Auto-Seed] Warning: sample_retail_data.csv not found for seeding.")
    except Exception as e:
        print(f"[Auto-Seed] Warning during database seeding: {e}")
        db.rollback()
