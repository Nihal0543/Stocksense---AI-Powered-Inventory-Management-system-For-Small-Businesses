// Smart API Base URL Resolution
// 1. Checks VITE_API_URL environment variable (set in Netlify Dashboard / .env)
// 2. If running on public domain (Netlify) and VITE_API_URL is localhost, ignores it to prevent Mixed Content blocking
// 3. Defaults to relative '/api' on production (for Netlify proxying) or 'http://localhost:8000/api' in local dev

const envUrl = (import.meta.env.VITE_API_URL || '').trim();
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

let resolvedBaseUrl = envUrl;

if (!isLocalhost && resolvedBaseUrl && (resolvedBaseUrl.includes('localhost') || resolvedBaseUrl.includes('127.0.0.1'))) {
  console.warn('[StockSense] VITE_API_URL points to localhost in production. Using relative "/api" to avoid mixed content block.');
  resolvedBaseUrl = '/api';
}

if (!resolvedBaseUrl) {
  resolvedBaseUrl = isLocalhost ? 'http://localhost:8000/api' : '/api';
}

if (resolvedBaseUrl && !resolvedBaseUrl.endsWith('/api') && !resolvedBaseUrl.endsWith('/api/')) {
  resolvedBaseUrl = resolvedBaseUrl.replace(/\/$/, '') + '/api';
}

export const API_BASE_URL = resolvedBaseUrl;

function getHeaders(): Record<string, string> {
  const token = localStorage.getItem('stocksense_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function parseResponse(res: Response, defaultMessage = 'Request failed'): Promise<any> {
  if (!res.ok) {
    let errorDetail = '';
    try {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        errorDetail = data.detail || data.message || '';
      } else {
        const text = await res.text();
        if (res.status === 404) {
          errorDetail = `Backend API returned 404 (Not Found). Ensure your backend is deployed and connected.`;
        } else if (res.status === 502 || res.status === 503) {
          errorDetail = `Backend server is starting up or temporarily unavailable (${res.status}). Please retry in a few seconds.`;
        } else {
          errorDetail = text.slice(0, 150);
        }
      }
    } catch {
      errorDetail = `${res.status} ${res.statusText}`;
    }
    throw new Error(errorDetail || `${defaultMessage} (Status ${res.status})`);
  }
  return res.json();
}

function wrapFetchError(err: any): never {
  if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
    throw new Error(
      `Cannot connect to StockSense API backend at "${API_BASE_URL}". Please ensure the backend is running and CORS is permitted.`
    );
  }
  throw err;
}

export const api = {
  // Auth
  async login(formData: FormData): Promise<{ access_token: string; token_type: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        body: formData, // OAuth2PasswordRequestForm expects form-data
      });
      return await parseResponse(res, 'Login failed');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  async register(data: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await parseResponse(res, 'Registration failed');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Dashboard Data
  async getDashboardData(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load dashboard data');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Ingestion
  async uploadCSV(file: File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const headers = getHeaders();
      delete headers['Content-Type']; // Let browser set boundary automatically for multi-part

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });
      return await parseResponse(res, 'Upload failed');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Products
  async getProducts(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load products');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Sales
  async getSales(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/sales`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load sales');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Inventory
  async getInventory(filters: {
    category?: string;
    supplier?: string;
    warehouse?: string;
    low_stock?: boolean;
    search?: string;
  } = {}): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters.supplier && filters.supplier !== 'All') params.append('supplier', filters.supplier);
      if (filters.warehouse && filters.warehouse !== 'All') params.append('warehouse', filters.warehouse);
      if (filters.low_stock) params.append('low_stock', 'true');
      if (filters.search) params.append('search', filters.search);

      const res = await fetch(`${API_BASE_URL}/inventory?${params.toString()}`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load inventory');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Demand Forecasting
  async trainForecastModel(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/train`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Model training failed');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  async getForecast(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/forecast`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load forecasts');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Recommendations
  async getRecommendations(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations`, {
        headers: getHeaders(),
      });
      return await parseResponse(res, 'Failed to load recommendations');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // Decision Simulator
  async simulateDecision(input: {
    product_id: number;
    reorder_quantity: number;
    holding_cost_override?: number;
    unit_cost_override?: number;
    selling_price_override?: number;
    lead_time_override?: number;
  }): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/simulate`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(input),
      });
      return await parseResponse(res, 'Simulation calculation failed');
    } catch (err) {
      wrapFetchError(err);
    }
  },

  // AI Chat Assistant RAG
  async chat(message: string, history: any[]): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message, history }),
      });
      return await parseResponse(res, 'Failed to receive chat response');
    } catch (err) {
      wrapFetchError(err);
    }
  }
};
