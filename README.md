# StockSense AI 🛒
### AI-Powered Inventory Management System for Small Businesses & Kirana Stores

[![Deploy with Netlify](https://img.shields.io/badge/Frontend-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://stocksense-ai-backend.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nihal0543/Stocksense---AI-Powered-Inventory-Management-system-For-Small-Businesses)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Hosted Links

| Component | Platform | Live URL / Access Link |
| :--- | :--- | :--- |
| **Frontend Web Application** | **Netlify** | 🚀 **[Launch StockSense AI on Netlify](https://stocksense-ai-retail.netlify.app)** *(https://stocksense-inventroymanagementsystem.netlify.app)* |
| **Backend REST API Server** | **Render** | ⚡ **[https://stocksense-ai-backend.onrender.com](https://stocksense-ai-backend.onrender.com)** |
| **Interactive API Documentation** | **Render Swagger UI** | 📖 **[https://stocksense-ai-backend.onrender.com/docs](https://stocksense-ai-backend.onrender.com/docs)** |
| **GitHub Source Code** | **GitHub** | 💻 **[Nihal0543/Stocksense AI Repository](https://github.com/Nihal0543/Stocksense---AI-Powered-Inventory-Management-system-For-Small-Businesses)** |

---

## 🏬 Authentic Indian Kirana Store Catalog

The system is pre-loaded with high-velocity, authentic commodities commonly found in Indian neighborhood Kirana stores, priced in Indian Rupees (₹):

| SKU | Product Name | Category | Supplier | Price (₹) | Default Stock Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `KIRANA-ATTA-001` | **Aashirvaad Shudh Chakki Atta (5kg)** | Atta & Flours | ITC Limited | ₹245.00 | ⚠️ Low Stock (8 / 15 reorder) |
| `KIRANA-OIL-002` | **Fortune Sunlite Refined Sunflower Oil (1L)** | Edible Oils | Adani Wilmar | ₹135.00 | 🟢 Healthy Stock (45 / 20) |
| `KIRANA-MILK-003` | **Amul Taaza Homogenised Toned Milk (1L)** | Dairy & Daily Fresh | GCMMF (Amul) | ₹56.00 | 🟢 High Turnover (110 / 40) |
| `KIRANA-SALT-004` | **Tata Salt Iodised (1kg)** | Spices & Condiments | Tata Consumer Products | ₹28.00 | 🟢 Healthy Stock (135 / 30) |
| `KIRANA-RICE-005` | **India Gate Rozzana Basmati Rice (1kg)** | Rice & Grains | KRBL Limited | ₹95.00 | ⚠️ Low Stock (14 / 25 reorder) |
| `KIRANA-MAGGI-006` | **Maggi 2-Minute Masala Noodles (4-Pack)** | Snacks & Instant Food | Nestlé India | ₹56.00 | 🟢 Fast Moving (80 / 30) |
| `KIRANA-PARLE-007` | **Parle-G Gold Glucose Biscuits (250g)** | Bakery & Biscuits | Parle Products | ₹30.00 | 🟢 Everyday Snack (160 / 45) |
| `KIRANA-CHAI-008` | **Tata Tea Premium Desh Ki Chai (500g)** | Beverages & Tea | Tata Consumer Products | ₹210.00 | ⚠️ Low Stock (16 / 20 reorder) |
| `KIRANA-SURF-009` | **Surf Excel Easy Wash Detergent (1kg)** | Household Cleaning | Hindustan Unilever | ₹145.00 | 🟢 Healthy Stock (38 / 15) |
| `KIRANA-DETTOL-010` | **Dettol Germ Protection Soap (100g)** | Personal Care | Reckitt Benckiser | ₹42.00 | 🔵 Overstock (240 / 30) |
| `KIRANA-DAL-011` | **Desi Toor Dal Unpolished (1kg)** | Pulses & Dals | Desi Agro Traders | ₹165.00 | 🟢 Healthy Stock (22 / 20) |
| `KIRANA-SUGAR-012` | **Madhur Pure & Hygienic Sugar (1kg)** | Sugar & Jaggery | Shree Renuka Sugars | ₹52.00 | 🟢 Healthy Stock (115 / 35) |

---

## 📌 Project Overview

**StockSense AI** is a state-of-the-art retail decision intelligence and inventory management platform tailored specifically for small business owners and Indian Kirana stores. 

Traditional retail inventory management often suffers from manual stock counts, delayed reorders, tied-up working capital in slow-moving items, and unexpected stockouts of high-demand goods. StockSense AI bridges this gap by combining machine learning demand forecasting (XGBoost), scenario simulations, natural language database intelligence, and multilingual accessibility into an intuitive, glassmorphism-styled dashboard.

---

## ⚡ Key Highlights & Features

- 🇮🇳 **Bilingual Support (English & हिन्दी)**: Complete, instant localization toggle across all dashboards, forecast tables, decision tools, and AI prompts with native Devanagari typography.
- 💰 **Indian Rupee (₹ INR) Standard**: All sales KPIs, inventory valuation, holding costs, restocking orders, and simulations are formatted natively in **₹** with Indian numbering conventions (`en-IN`).
- 🌓 **Synchronized Dark & Light Theme**: Built-in instantaneous theme toggle with persistent storage, zero flash of unstyled content (FOUC), and tailored glassmorphic styling for low-light retail counters.
- 📊 **Executive Manager KPI Dashboard**: Real-time visibility into inventory turnover, today's sales revenue, stockout risks, category breakdowns, and low-stock alerts.
- 📦 **Smart Inventory Portal**: Search by SKU or product name, filter by category and warehouse, sort dynamically, and inspect stock health pills.
- 🔮 **Machine Learning Demand Forecasting**: Custom XGBoost regression engine that analyzes historical transactions, extracts seasonal lags, and predicts 7-day inventory demand with confidence bands.
- 🎯 **Decision Simulator**: Interactive playground where managers tweak pricing, discounts, and order sizes to simulate projected net margins, stockout probabilities, and ROI before committing cash.
- 🤖 **AI Kirana Store Assistant**: Retrieval-Augmented Generation (RAG) assistant powered by Google Gemini (with offline rule-engine fallback) that answers inventory questions in English and Hindi.
- 📥 **Batch CSV Data Ingestion**: Cleanse, normalize, and ingest supplier invoices and transaction logs with automated error-handling.

---

## 🔑 Quick Demo Credentials


Try the live application without setting up a new account:

- **Email**: `manager@retailstore.com`
- **Password**: `password123`
- *(Or click the **Auto-Fill** button on the Login screen)*

---

## 🏗️ Technical Architecture

```mermaid
graph TD
    User([Store Manager]) <--> WebApp[React Vite + TypeScript SPA]
    WebApp -->|Reverse Proxy /api/*| NetlifyProxy[Netlify Edge Router]
    NetlifyProxy -->|HTTPS Requests| BackendAPI[FastAPI Uvicorn Cloud Server]
    
    subgraph "Backend Intelligence Engine (Render)"
        BackendAPI --> SQLite[(SQLite / PostgreSQL ORM)]
        BackendAPI --> MLModel[XGBoost Demand Forecaster]
        BackendAPI --> LLMService[Google Gemini AI / Offline Logic]
        BackendAPI --> Ingestion[Pandas Batch Data Cleaner]
    end
```

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Glassmorphism, Google Fonts (Inter, Outfit, Noto Sans Devanagari) |
| **Data Visualization** | Recharts (Area, Bar, and Donut Charts) |
| **Backend Framework** | Python 3.11, FastAPI, Uvicorn, SQLAlchemy |
| **Machine Learning** | XGBoost, Scikit-Learn, Pandas, NumPy |
| **Generative AI** | Google Gemini API (`google-genai` SDK) |
| **Deployment & Hosting** | Netlify (Frontend & SPA Edge Proxy), Render (Python FastAPI Web Service), GitHub Actions |

---

## 🚀 Local Installation & Development

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI development server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The backend will automatically create and seed the SQLite database with products, inventory, transactions, and a trained ML model upon first boot.

### 2. Frontend Setup

```bash
cd frontend

# Install node dependencies
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🐳 Docker Deployment

To spin up the entire application stack (PostgreSQL + FastAPI + Nginx React Frontend):

```bash
docker-compose up --build
```

Access the application at `http://localhost`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
