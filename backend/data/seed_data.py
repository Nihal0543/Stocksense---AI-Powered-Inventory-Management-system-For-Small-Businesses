import csv
import random
import os
from datetime import datetime, timedelta

def generate_retail_csv():
    # Authentic Indian Kirana Store Products
    products = [
        {
            "sku": "KIRANA-ATTA-001",
            "product_name": "Aashirvaad Shudh Chakki Atta (5kg)",
            "category": "Atta & Flours",
            "supplier": "ITC Limited",
            "price": 245.00,
            "current_stock": 8,       # Low Stock! (Reorder level is 15)
            "reorder_level": 15,
            "warehouse": "Shelf A1 (Flour Rack)",
            "avg_daily_sales": 4.5
        },
        {
            "sku": "KIRANA-OIL-002",
            "product_name": "Fortune Sunlite Refined Sunflower Oil (1L)",
            "category": "Edible Oils",
            "supplier": "Adani Wilmar",
            "price": 135.00,
            "current_stock": 45,     # Healthy Stock
            "reorder_level": 20,
            "warehouse": "Shelf A2 (Oils Rack)",
            "avg_daily_sales": 6.0
        },
        {
            "sku": "KIRANA-MILK-003",
            "product_name": "Amul Taaza Homogenised Toned Milk (1L)",
            "category": "Dairy & Daily Fresh",
            "supplier": "GCMMF (Amul)",
            "price": 56.00,
            "current_stock": 110,    # High volume daily staple
            "reorder_level": 40,
            "warehouse": "Cooler Rack C1 (Dairy)",
            "avg_daily_sales": 28.0
        },
        {
            "sku": "KIRANA-SALT-004",
            "product_name": "Tata Salt Iodised (1kg)",
            "category": "Spices & Condiments",
            "supplier": "Tata Consumer Products",
            "price": 28.00,
            "current_stock": 135,    # Healthy Stock
            "reorder_level": 30,
            "warehouse": "Shelf B1 (Spices)",
            "avg_daily_sales": 12.0
        },
        {
            "sku": "KIRANA-RICE-005",
            "product_name": "India Gate Rozzana Basmati Rice (1kg)",
            "category": "Rice & Grains",
            "supplier": "KRBL Limited",
            "price": 95.00,
            "current_stock": 14,     # Low Stock! (Reorder level is 25)
            "reorder_level": 25,
            "warehouse": "Shelf B2 (Grains)",
            "avg_daily_sales": 5.0
        },
        {
            "sku": "KIRANA-MAGGI-006",
            "product_name": "Maggi 2-Minute Masala Noodles (4-Pack)",
            "category": "Snacks & Instant Food",
            "supplier": "Nestlé India",
            "price": 56.00,
            "current_stock": 80,     # Healthy Stock
            "reorder_level": 30,
            "warehouse": "Front Counter Rack",
            "avg_daily_sales": 15.0
        },
        {
            "sku": "KIRANA-PARLE-007",
            "product_name": "Parle-G Gold Glucose Biscuits (250g)",
            "category": "Bakery & Biscuits",
            "supplier": "Parle Products",
            "price": 30.00,
            "current_stock": 160,    # High turnover snack
            "reorder_level": 45,
            "warehouse": "Front Counter Rack",
            "avg_daily_sales": 24.0
        },
        {
            "sku": "KIRANA-CHAI-008",
            "product_name": "Tata Tea Premium Desh Ki Chai (500g)",
            "category": "Beverages & Tea",
            "supplier": "Tata Consumer Products",
            "price": 210.00,
            "current_stock": 16,     # Low Stock! (Reorder level is 20)
            "reorder_level": 20,
            "warehouse": "Shelf A3 (Beverages)",
            "avg_daily_sales": 4.0
        },
        {
            "sku": "KIRANA-SURF-009",
            "product_name": "Surf Excel Easy Wash Detergent (1kg)",
            "category": "Household Cleaning",
            "supplier": "Hindustan Unilever",
            "price": 145.00,
            "current_stock": 38,     # Healthy Stock
            "reorder_level": 15,
            "warehouse": "Back Wall Shelf D1",
            "avg_daily_sales": 3.5
        },
        {
            "sku": "KIRANA-DETTOL-010",
            "product_name": "Dettol Germ Protection Soap (100g)",
            "category": "Personal Care",
            "supplier": "Reckitt Benckiser",
            "price": 42.00,
            "current_stock": 240,    # Overstock! (Reorder level is 30)
            "reorder_level": 30,
            "warehouse": "Back Wall Shelf D2",
            "avg_daily_sales": 6.0
        },
        {
            "sku": "KIRANA-DAL-011",
            "product_name": "Desi Toor Dal Unpolished (1kg)",
            "category": "Pulses & Dals",
            "supplier": "Desi Agro Traders",
            "price": 165.00,
            "current_stock": 22,     # Healthy Stock
            "reorder_level": 20,
            "warehouse": "Shelf B3 (Pulses)",
            "avg_daily_sales": 4.2
        },
        {
            "sku": "KIRANA-SUGAR-012",
            "product_name": "Madhur Pure & Hygienic Sugar (1kg)",
            "category": "Sugar & Jaggery",
            "supplier": "Shree Renuka Sugars",
            "price": 52.00,
            "current_stock": 115,    # Healthy Stock
            "reorder_level": 35,
            "warehouse": "Shelf A1 (Flour Rack)",
            "avg_daily_sales": 14.0
        }
    ]

    # Generate 60 days of historical sales transactions
    end_date = datetime.now()
    start_date = end_date - timedelta(days=60)
    
    rows = []
    
    # Header
    header = [
        "sku", "product_name", "category", "supplier", "price",
        "current_stock", "reorder_level", "warehouse",
        "sale_date", "quantity", "revenue"
    ]
    
    random.seed(42)  # Deterministic generation for consistency
    current_date = start_date
    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")
        day_of_week = current_date.weekday() # 0 = Monday, 6 = Sunday
        
        for prod in products:
            base_sales = prod["avg_daily_sales"]
            
            # Weekend boost for grocery shopping
            multiplier = 1.0
            if day_of_week in [4, 5, 6]:
                multiplier = 1.35
            
            # Occasional festive/holiday surge
            if random.random() < 0.05:
                multiplier *= 1.8
                
            qty_sold = int(random.gauss(base_sales * multiplier, max(1.0, base_sales * 0.2)))
            qty_sold = max(0, qty_sold)
            
            # High turnover staples always sell every day in Kirana stores
            if base_sales >= 10 and qty_sold == 0:
                qty_sold = int(base_sales * 0.7)

            if qty_sold > 0:
                revenue = round(qty_sold * prod["price"], 2)
                rows.append([
                    prod["sku"],
                    prod["product_name"],
                    prod["category"],
                    prod["supplier"],
                    prod["price"],
                    prod["current_stock"],
                    prod["reorder_level"],
                    prod["warehouse"],
                    date_str,
                    qty_sold,
                    revenue
                ])
                
        current_date += timedelta(days=1)
        
    # Write to CSV in backend/data
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "sample_retail_data.csv")
    with open(output_path, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(rows)
        
    print(f"[Seed] Successfully generated {len(rows)} Kirana transactions for {len(products)} products at: {output_path}")
    return output_path

if __name__ == "__main__":
    generate_retail_csv()
