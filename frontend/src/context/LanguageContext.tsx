import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Nav
  appName: { en: 'StockSense AI', hi: 'स्टॉकसेंस एआई' },
  navDashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  navInventory: { en: 'Inventory', hi: 'इन्वेंट्री (स्टॉक)' },
  navForecast: { en: 'Forecast', hi: 'मांग पूर्वानुमान' },
  navRecommendations: { en: 'Recommendations', hi: 'सिफारिशें' },
  navSimulator: { en: 'Decision Simulator', hi: 'निर्णय सिम्युलेटर' },
  navChat: { en: 'AI Chat Assistant', hi: 'एआई चैट सहायक' },
  navSettings: { en: 'Settings & Looker', hi: 'सेटिंग्स और लुक़र' },
  navLogout: { en: 'Logout', hi: 'लॉगआउट' },
  navLoggedInAs: { en: 'Logged in as', hi: 'लॉग इन' },

  // Page Headers
  dashTitle: { en: 'Operational Dashboard', hi: 'संचालन डैशबोर्ड' },
  dashSubtitle: { en: 'Overview of Kirana store sales, inventory counts, and forecasting alerts.', hi: 'किराना दुकान की बिक्री, स्टॉक स्तर और मांग पूर्वानुमान अलर्ट का संपूर्ण विवरण।' },
  invTitle: { en: 'Kirana Inventory Directory', hi: 'किराना स्टॉक सूची (इन्वेंट्री)' },
  invSubtitle: { en: 'Search, filter, and inspect Kirana products across your warehouses.', hi: 'अपने सभी गोदामों में किराना उत्पादों की खोज, फिल्टर और समीक्षा करें।' },
  forecastTitle: { en: 'Predictive Demand Forecast', hi: 'भविष्य की मांग का पूर्वानुमान' },
  forecastSubtitle: { en: 'Tomorrow and next-week grocery demand driven by XGBoost ML.', hi: 'XGBoost मशीन लर्निंग द्वारा संचालित कल और अगले सप्ताह की अनुमानित मांग।' },
  recTitle: { en: 'Restocking Suggestions', hi: 'पुनः ऑर्डर (रीस्टॉक) सिफारिशें' },
  recSubtitle: { en: 'AI-guided restock orders, risk analysis, and revenue impacts.', hi: 'एआई-आधारित पुनः ऑर्डर सुझाव, जोखिम विश्लेषण और राजस्व प्रभाव।' },
  simTitle: { en: 'Decision Impact Simulator', hi: 'निर्णय प्रभाव सिम्युलेटर' },
  simSubtitle: { en: 'Flagship tool: simulate order size adjustments and review visual trade-offs.', hi: 'ऑर्डर आकार का सिमुलेशन करें और लागत व मुनाफे का तुलनात्मक विश्लेषण देखें।' },
  chatTitle: { en: 'AI Kirana Assistant Chat', hi: 'एआई किराना चैट सहायक' },
  chatSubtitle: { en: 'Ask Gemini questions about reorders, overstocks, and sales patterns.', hi: 'किराना पुनः ऑर्डर, अतिरिक्त स्टॉक और बिक्री पैटर्न के बारे में प्रश्न पूछें।' },
  settingsTitle: { en: 'Looker Studio & Credentials', hi: 'लुक़र स्टूडियो और क्रेडेंशियल' },
  settingsSubtitle: { en: 'Access database views for Looker Studio and update configurations.', hi: 'लुक़र स्टूडियो के लिए डेटाबेस व्यूज और सेटिंग्स प्रबंधित करें।' },

  // Dashboard KPIs
  totalUnits: { en: 'Total Stock Units', hi: 'कुल स्टॉक इकाइयाँ' },
  totalUnitsDesc: { en: 'Sum of inventory on hand across warehouses', hi: 'सभी गोदामों में उपलब्ध कुल किराना सामान' },
  activeProducts: { en: 'Active Kirana SKUs', hi: 'सक्रिय किराना उत्पाद' },
  activeProductsDesc: { en: 'Unique grocery items registered in database', hi: 'डेटाबेस में पंजीकृत सक्रिय किराना वस्तुएं' },
  forecastDemand: { en: 'Forecasted 30-Day Demand', hi: '30 दिनों की अनुमानित मांग' },
  forecastDemandDesc: { en: 'Aggregated projection across all Kirana products', hi: 'सभी किराना वस्तुओं की कुल अनुमानित मांग' },
  stockoutAlerts: { en: 'Stockout Risk Alerts', hi: 'स्टॉकआउट जोखिम अलर्ट' },
  stockoutAlertsDesc: { en: 'Products at or below safe reorder thresholds', hi: 'सुरक्षित रीऑर्डर स्तर से नीचे चल रहे उत्पाद' },
  salesTrends: { en: 'Historical Sales Trends', hi: 'ऐतिहासिक बिक्री का रुझान' },
  categoryBreakdown: { en: 'Category Distribution', hi: 'श्रेणीवार वितरण' },
  topSuppliers: { en: 'Top FMCG Suppliers', hi: 'शीर्ष किराना आपूर्तिकर्ता' },
  healthy: { en: 'HEALTHY', hi: 'सुरक्षित स्टॉक' },
  lowStock: { en: 'LOW STOCK', hi: 'कम स्टॉक' },
  overstock: { en: 'OVERSTOCK', hi: 'अतिरिक्त स्टॉक' },

  // Inventory Page
  searchPlaceholder: { en: 'Search product name or SKU...', hi: 'किराना उत्पाद का नाम या SKU खोजें...' },
  category: { en: 'Category', hi: 'श्रेणी' },
  supplier: { en: 'Supplier', hi: 'आपूर्तिकर्ता' },
  warehouse: { en: 'Warehouse', hi: 'गोदाम' },
  all: { en: 'All', hi: 'सभी' },
  lowStockOnly: { en: 'Low Stock Only', hi: 'केवल कम स्टॉक' },
  productSku: { en: 'Product Name', hi: 'किराना उत्पाद का नाम' },
  skuCode: { en: 'SKU / Code', hi: 'एसकेयू कोड' },
  unitPrice: { en: 'Unit Price', hi: 'इकाई मूल्य' },
  currentStock: { en: 'Current Stock', hi: 'वर्तमान स्टॉक' },
  reorderLevel: { en: 'Reorder Level', hi: 'रीऑर्डर स्तर' },
  status: { en: 'Stock Status', hi: 'स्टॉक स्थिति' },
  actions: { en: 'Actions', hi: 'कार्रवाई' },
  simulate: { en: 'Simulate', hi: 'सिम्युलेट करें' },
  noItemsFound: { en: 'No products match the selected filters.', hi: 'चयनित फिल्टर के अनुसार कोई उत्पाद नहीं मिला।' },

  // Recommendations Page
  allRecs: { en: 'All Recommendations', hi: 'सभी सिफारिशें' },
  highPriority: { en: 'High Priority', hi: 'उच्च प्राथमिकता' },
  medPriority: { en: 'Medium Priority', hi: 'मध्यम प्राथमिकता' },
  lowPriority: { en: 'Low Priority', hi: 'निम्न प्राथमिकता' },
  urgencyHigh: { en: 'URGENT RESTOCK', hi: 'तत्काल रीस्टॉक' },
  urgencyMed: { en: 'LEAD TIME WARNING', hi: 'सप्लाई समय चेतावनी' },
  urgencyLow: { en: 'OVERSTOCK / HEALTHY', hi: 'अतिरिक्त / सुरक्षित' },
  suggestedQty: { en: 'Suggested Order Quantity', hi: 'सुझाई गई ऑर्डर मात्रा' },
  currentStockUnits: { en: 'Current Stock', hi: 'वर्तमान स्टॉक' },
  expectedLostSales: { en: 'Predicted Lost Sales Impact', hi: 'संभावित बिक्री नुकसान प्रभाव' },
  holdingCostImpact: { en: 'Holding Cost Variance', hi: 'होल्डिंग लागत प्रभाव' },
  simulateBtn: { en: 'Simulate Order', hi: 'ऑर्डर सिम्युलेट करें' },

  // Forecast Page
  modelPerformance: { en: 'XGBoost Model Performance', hi: 'XGBoost मॉडल प्रदर्शन' },
  r2Score: { en: 'R² Accuracy Score', hi: 'R² सटीकता स्कोर' },
  confidence: { en: 'Prediction Confidence', hi: 'पूर्वानुमान विश्वास' },
  mse: { en: 'Mean Squared Error', hi: 'औसत वर्ग त्रुटि (MSE)' },
  forecastTable: { en: 'Next Day Kirana Demand Projection', hi: 'अगले दिन की किराना मांग का पूर्वानुमान' },
  predictedSales: { en: 'Predicted Sales', hi: 'अनुमानित बिक्री' },
  stockoutProb: { en: 'Stockout Probability', hi: 'स्टॉकआउट संभावना' },
  riskLevel: { en: 'Risk Level', hi: 'जोखिम स्तर' },

  // Decision Simulator
  chooseProduct: { en: 'Select Kirana Product to Simulate', hi: 'सिम्युलेट करने के लिए किराना उत्पाद चुनें' },
  orderQtyInput: { en: 'Enter Order Quantity (Units)', hi: 'ऑर्डर मात्रा दर्ज करें (यूनिट)' },
  aiRecommendedQty: { en: 'AI Recommended Quantity', hi: 'एआई अनुशंसित मात्रा' },
  scenarioA: { en: 'Scenario A: AI Recommended Plan', hi: 'परिदृश्य A: एआई अनुशंसित योजना' },
  scenarioB: { en: 'Scenario B: Your Selected Plan', hi: 'परिदृश्य B: आपका चुना हुआ निर्णय' },
  expectedRevenue: { en: 'Expected Revenue', hi: 'अपेक्षित कुल बिक्री' },
  expectedProfit: { en: 'Expected Net Profit', hi: 'अपेक्षित शुद्ध मुनाफा' },
  holdingCost: { en: 'Monthly Holding Cost', hi: 'मासिक रख-रखाव लागत' },
  stockoutRisk: { en: 'Stockout Risk', hi: 'स्टॉकआउट जोखिम' },
  potentialLostSales: { en: 'Expected Lost Sales', hi: 'अनुमानित बिक्री नुकसान' },
  decisionScore: { en: 'Decision Quality Score', hi: 'निर्णय गुणवत्ता स्कोर' },
  geminiAnalysis: { en: 'Gemini AI Business Explanation', hi: 'एआई व्यापारिक निर्णय विश्लेषण' },
  quickAdjust: { en: 'Quick Adjust Quantity', hi: 'त्वरित मात्रा चयन' },
  matchAiRec: { en: 'Use AI Recommendation', hi: 'एआई सिफारिश लागू करें' },

  // AI Chat
  chatInputPlaceholder: { en: 'Ask a question about your Kirana inventory, restock orders, or sales...', hi: 'अपने किराना स्टॉक, पुनः ऑर्डर या बिक्री रुझान के बारे में पूछें...' },
  sendBtn: { en: 'Send', hi: 'भेजें' },
  quickPromptsTitle: { en: 'Suggested Questions:', hi: 'सुझाए गए त्वरित प्रश्न:' },
  prompt1: { en: 'Which Kirana products should I reorder tomorrow?', hi: 'कल कौन सा किराना सामान पुनः ऑर्डर करना चाहिए?' },
  prompt2: { en: 'Why is milk demand increasing?', hi: 'दूध और आटे की मांग क्यों बढ़ रही है?' },
  prompt3: { en: 'How can I reduce overstock holding costs?', hi: 'अतिरिक्त स्टॉक कैसे कम करें?' },
  prompt4: { en: 'Show products with high stockout risk', hi: 'उच्च स्टॉकआउट जोखिम वाले किराना उत्पाद दिखाएं' },

  // Settings
  lookerGuide: { en: 'Looker Studio Database Views', hi: 'लुक़र स्टूडियो डेटाबेस व्यूज' },
  lookerDesc: { en: 'StockSense AI provides 3 pre-built SQL views ready to connect directly into Google Looker Studio.', hi: 'स्टॉकसेंस एआई गूगल लुक़र स्टूडियो से कनेक्ट करने के लिए 3 तैयार डेटाबेस व्यू प्रदान करता है।' },
  salesTrendsView: { en: '1. Sales Trends View (v_sales_trends)', hi: '1. बिक्री रुझान व्यू (v_sales_trends)' },
  inventoryHealthView: { en: '2. Inventory Health View (v_inventory_health)', hi: '2. इन्वेंट्री स्वास्थ्य व्यू (v_inventory_health)' },
  demandForecastView: { en: '3. Demand Forecast View (v_demand_forecast)', hi: '3. मांग पूर्वानुमान व्यू (v_demand_forecast)' },
  uploadCsvTitle: { en: 'Upload Store Sales & Inventory CSV', hi: 'किराना बिक्री एवं इन्वेंट्री CSV अपलोड करें' },
  trainModelBtn: { en: 'Retrain XGBoost Forecasting Model', hi: 'XGBoost मांग पूर्वानुमान मॉडल ट्रेन करें' },

  // Login
  loginWelcome: { en: 'Welcome back to StockSense AI', hi: 'स्टॉकसेंस एआई में आपका स्वागत है' },
  loginSubtitle: { en: 'AI-Powered Decision Intelligence for Indian Kirana Stores', hi: 'भारतीय किराना दुकानों के लिए एआई संचालित निर्णय प्रणाली' },
  emailLabel: { en: 'Email address', hi: 'ईमेल पता' },
  passwordLabel: { en: 'Password', hi: 'पासवर्ड' },
  signInBtn: { en: 'Sign in to Dashboard', hi: 'डैशबोर्ड में साइन इन करें' },
  demoCreds: { en: 'Default Manager Credentials', hi: 'डिफ़ॉल्ट मैनेजर क्रेडेंशियल' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  formatCurrency: (amount: number, options?: { decimals?: number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('stocksense_lang');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('stocksense_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      return translations[key][language] || fallback || key;
    }
    return fallback || key;
  };

  const formatCurrency = (amount: number, options?: { decimals?: number }): string => {
    const decimals = options?.decimals !== undefined ? options.decimals : 2;
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '₹0.00';
    }
    const formattedNum = Number(amount).toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `₹${formattedNum}`;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
