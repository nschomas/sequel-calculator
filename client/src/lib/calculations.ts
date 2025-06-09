export interface FormData {
  practiceName: string;
  comprehensiveExams: number | null;
  opticalConversion: number | null;
  cashPayPercentage: number | null;
  mvcConversion: number | null;
}

export interface ProductResults {
  cashPayPatients: number;
  mvcPatients: number;
  monthlyOrders: number;
  monthlyRevenue: number;
  monthlyProfit: number;
  annualRevenue: number;
  annualProfit: number;
}

export interface Results {
  sequel: ProductResults;
  neurolens: ProductResults;
  total: {
    monthlyRevenue: number;
    monthlyProfit: number;
    annualRevenue: number;
    annualProfit: number;
  };
}

export function calculateResults(formData: FormData): Results {
  const { comprehensiveExams, opticalConversion, cashPayPercentage, mvcConversion } = formData;
  
  // Ensure we have numbers for calculation, defaulting to 0 if null
  const exams = comprehensiveExams ?? 0;
  const optical = opticalConversion ?? 0;
  const cash = cashPayPercentage ?? 0;
  const mvc = mvcConversion ?? 0;

  // Sequel calculations (60% of optical conversions)
  const sequelBase = exams * optical * 0.6;
  const sequelCashPay = Math.round(sequelBase * cash);
  const sequelMVC = Math.round(sequelBase * mvc);
  const sequelOrders = sequelCashPay + sequelMVC;
  
  // Neurolens calculations (30% of optical conversions)
  const neurolensBase = exams * optical * 0.3;
  const neurolensCashPay = Math.round(neurolensBase * cash);
  const neurolensMVC = Math.round(neurolensBase * mvc);
  const neurolensOrders = neurolensCashPay + neurolensMVC;
  
  // Revenue and profit calculations
  const sequelRevenue = sequelOrders * 460;
  const sequelProfit = sequelOrders * 247;
  const neurolensRevenue = neurolensOrders * 800;
  const neurolensProfit = neurolensOrders * 427;
  
  const totalRevenue = sequelRevenue + neurolensRevenue;
  const totalProfit = sequelProfit + neurolensProfit;
  
  return {
    sequel: {
      cashPayPatients: sequelCashPay,
      mvcPatients: sequelMVC,
      monthlyOrders: sequelOrders,
      monthlyRevenue: sequelRevenue,
      monthlyProfit: sequelProfit,
      annualRevenue: sequelRevenue * 12,
      annualProfit: sequelProfit * 12
    },
    neurolens: {
      cashPayPatients: neurolensCashPay,
      mvcPatients: neurolensMVC,
      monthlyOrders: neurolensOrders,
      monthlyRevenue: neurolensRevenue,
      monthlyProfit: neurolensProfit,
      annualRevenue: neurolensRevenue * 12,
      annualProfit: neurolensProfit * 12
    },
    total: {
      monthlyRevenue: totalRevenue,
      monthlyProfit: totalProfit,
      annualRevenue: totalRevenue * 12,
      annualProfit: totalProfit * 12
    }
  };
}
