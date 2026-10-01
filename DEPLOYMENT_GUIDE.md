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

### Step 2: Connect Your Netlify Frontend to the Backend

1. Open your **[Netlify Dashboard](https://app.netlify.com/)** and select your StockSense AI site.
2. Go to **Site configuration** -> **Environment variables**.
3. Click **Add a variable** -> **Add a single variable**:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://<YOUR-RENDER-BACKEND-NAME>.onrender.com/api`  
     *(Make sure to append `/api` at the end!)*
4. Go to **Deploys** in the top navigation bar.
5. Click **Trigger deploy** -> **Clear cache and deploy site**.
6. Wait 1 minute for Netlify to rebuild your frontend with the new backend URL.

---

### Step 3: Test and Enjoy Your Live Application!

1. Open your Netlify site URL (e.g., `https://<your-site>.netlify.app`).
2. On the login screen:
   - Click the new **"Auto-Fill"** button (or enter `manager@retailstore.com` / `password123`).
   - Click **Sign In**.
3. You will immediately see:
   - **Manager KPI Dashboard**: Live inventory values, today's sales, low stock alerts, and interactive charts.
   - **Interactive Inventory Portal**: Search by name or SKU, filter by category or warehouse, and view real-time stock levels.
   - **ML Demand Forecasting**: View predicted daily sales demand and stockout probabilities powered by XGBoost.
   - **Decision Simulator**: Interactive sliders to simulate restocking quantities, profit margins, and ROI with AI explanations.
   - **AI Kirana Assistant**: Natural language store assistant that queries your inventory database.
