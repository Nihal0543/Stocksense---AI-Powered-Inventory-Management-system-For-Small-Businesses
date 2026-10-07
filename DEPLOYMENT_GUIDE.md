# StockSense AI – Production Cloud Deployment Guide

This guide explains how to get your **StockSense AI** backend and frontend running 100% in production with full live authentication, ML demand forecasting, decision simulation, and AI inventory intelligence.

---

## Why Only the Login Page Appeared on Netlify

1. **Netlify is a Frontend Host Only**:
   - Netlify specializes in static web hosting (HTML, CSS, JavaScript, React).
   - Netlify **cannot run Python web servers** like FastAPI, Uvicorn, Pandas, Scikit-learn, and XGBoost.
2. **Missing Backend Cloud Service**:
   - When you deployed the frontend to Netlify, the backend was still only located on your local machine (`http://localhost:8000`).
   - In production, when a browser visits `https://your-site.netlify.app`, attempting to make requests to `http://localhost:8000` is blocked by modern web browsers for two reasons:
     - **Mixed Content Security**: Public HTTPS websites are blocked from sending unencrypted requests to HTTP endpoints.
     - **Localhost Boundary**: External visitors do not have your local backend running on their devices.
3. **Single Page Application (SPA) Routing**:
   - Without a `_redirects` file, refreshing or directly loading routes like `/dashboard` on Netlify causes a 404 error.
   - **We have resolved this**: We added `_redirects` and `netlify.toml` so all SPA routes load seamlessly.

---

## 3-Minute Free Deployment Solution

### Step 1: Deploy the Python Backend on Render.com (100% Free)

[Render](https://render.com) provides free hosting for Python FastAPI web services and connects directly to your GitHub repository.

1. Go to **[render.com](https://render.com)** and sign in (or sign up) with your **GitHub account**.
2. Click the **"New +"** button in the top right, then select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and select your repo:
   `Stocksense---AI-Powered-Inventory-Management-system-For-Small-Businesses`
4. Configure the Web Service settings:
   - **Name**: `stocksense-ai-backend` (or any name you prefer)
   - **Region**: Choose the closest region (e.g., Singapore, Frankfurt, or Oregon)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: **Free**
5. *(Optional)* Under **Environment Variables**, you can add:
   - `GEMINI_API_KEY`: *(Your Google Gemini API key if you have one; if left empty, the built-in offline intelligence engine is used automatically)*.
6. Click **"Create Web Service"**.
7. Render will build and deploy your backend in approximately 2–3 minutes. Once the status shows **Live**, copy your public URL:
   `https://stocksense-ai-backend.onrender.com`

> **Note on Database Auto-Seeding**:
> When your backend boots for the first time on Render, our automated startup seeder will automatically create the database, seed products, inventory, and historical sales transactions, train the ML model, and generate the default manager account (`manager@retailstore.com` / `password123`).

---

### Step 2: Automatic Netlify API Proxying & In-App Config

1. **Automatic Edge Proxying**:
   - In both `netlify.toml` and `_redirects`, any request to `/api/*` is automatically reverse-proxied to `https://stocksense-ai-backend.onrender.com/api/:splat`.
   - This eliminates CORS and mixed-content issues completely!
2. **In-App Backend Override (Settings Page)**:
   - If your Render app has a custom URL (e.g. `https://stocksense-ai-backend-xxxx.onrender.com`), you can simply open **Settings** inside StockSense AI and paste your custom backend URL into the **Render Cloud Backend URL** box, then click **Test Connection** & **Save**.
3. **Triggering Deployment in Netlify**:
   - Because all changes are committed and pushed to your connected GitHub branch (`main`), Netlify automatically initiates a new deployment!
   - If you want to force an immediate clean build: in your Netlify dashboard, go to **Deploys** -> **Trigger deploy** -> **Clear cache and deploy site**.

---

### Step 3: Verified Features & End-to-End Walkthrough

1. **Language Toggle (English / हिन्दी)**:
   - Located on the top-right of the **Login page**, the **Header navigation**, and mobile sidebar.
   - Instantly switches the entire application between English and Hindi with native Devanagari typography, including KPI dashboards, menus, forecast tables, decision simulators, and AI Chat prompts.
2. **Indian Rupee (₹) Currency Everywhere**:
   - All revenue numbers, unit prices, holding costs, restocking projections, impact scores, and AI recommendations are natively presented in **₹ (INR)** with Indian numbering format (`en-IN`).
3. **Dark / Light Mode Toggle**:
   - Fully synchronized theme switcher with Tailwind CSS v4 class-based styling and localStorage persistence.
4. **Manager Login Credentials**:
   - Email: `manager@retailstore.com`
   - Password: `password123`
   - Or click the **Auto-Fill Manager Credentials** button on the login screen.
5. **Full Feature Tour**:
   - **Manager KPI Dashboard**: Live inventory values, today's sales, low stock alerts, and interactive charts in ₹.
   - **Interactive Inventory Portal**: Search by name or SKU, filter by category or warehouse, and view real-time stock levels in ₹.
   - **ML Demand Forecasting**: View predicted daily sales demand and stockout probabilities powered by XGBoost.
   - **Decision Simulator**: Interactive sliders to simulate restocking quantities, profit margins, and ROI with AI explanations in ₹.
   - **AI Kirana Assistant**: Natural language store assistant that queries your inventory database in both English and Hindi.

