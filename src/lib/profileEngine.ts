// Financial Profile Engine - Cross-feature logic system
export interface FinancialSnapshot {
  income: {
    monthlyNet: number;
    frequency: 'monthly' | 'bi-weekly' | 'weekly';
    sources: string[];
  };
  expenses: {
    fixedCosts: number;
    variableCosts: number;
    debtPayments: number;
    totalMonthly: number;
  };
  savings: {
    emergencyFund: number;
    emergencyGoal: number;
    totalSavings: number;
    monthlyContributions: number;
  };
  debt: {
    totalDebt: number;
    monthlyPayments: number;
    dtiRatio: number; // Debt-to-income ratio
  };
  goals: {
    housing: {
      targetAmount: number;
      currentSavings: number;
      timeline: number; // months
    };
    retirement: {
      targetAmount: number;
      currentSavings: number;
      monthlyContributions: number;
    };
  };
  riskFlags: RiskFlag[];
  lastUpdated: Date;
}

export interface RiskFlag {
  type: 'debt' | 'savings' | 'budget' | 'housing' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendation: string;
  affectedTools: string[];
}

export interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'budget' | 'savings' | 'debt' | 'investment' | 'housing';
  actionUrl?: string;
  deadline?: Date;
  completed: boolean;
}

// Core profile engine class
export class FinancialProfileEngine {
  private static instance: FinancialProfileEngine;
  private profile: FinancialSnapshot | null = null;

  private constructor() {}

  static getInstance(): FinancialProfileEngine {
    if (!FinancialProfileEngine.instance) {
      FinancialProfileEngine.instance = new FinancialProfileEngine();
    }
    return FinancialProfileEngine.instance;
  }

  // Update profile data from various tools
  updateFromBudgetCalculator(data: { income: number; needs: number; wants: number; savings: number }) {
    if (!this.profile) this.initializeProfile();
    
    this.profile!.income.monthlyNet = data.income;
    this.profile!.expenses.fixedCosts = data.needs;
    this.profile!.expenses.variableCosts = data.wants;
    this.profile!.savings.monthlyContributions = data.savings;
    this.profile!.lastUpdated = new Date();
    
    this.calculateRiskFlags();
    this.persistProfile();
  }

  updateFromEmergencyFund(data: { goal: number; current: number; monthlyContribution: number }) {
    if (!this.profile) this.initializeProfile();
    
    this.profile!.savings.emergencyGoal = data.goal;
    this.profile!.savings.emergencyFund = data.current;
    this.profile!.savings.monthlyContributions = data.monthlyContribution;
    this.profile!.lastUpdated = new Date();
    
    this.calculateRiskFlags();
    this.persistProfile();
  }

  updateFromDebtCalculator(data: { totalDebt: number; monthlyPayments: number }) {
    if (!this.profile) this.initializeProfile();
    
    this.profile!.debt.totalDebt = data.totalDebt;
    this.profile!.debt.monthlyPayments = data.monthlyPayments;
    this.profile!.debt.dtiRatio = this.calculateDTI();
    this.profile!.lastUpdated = new Date();
    
    this.calculateRiskFlags();
    this.persistProfile();
  }

  // Get smart recommendations for tools
  getRecommendationsForTool(toolName: string): SmartRecommendation[] {
    if (!this.profile) return [];

    const recommendations: SmartRecommendation[] = [];

    switch (toolName) {
      case 'housing-calculator':
        if (this.profile.debt.dtiRatio > 0.4) {
          recommendations.push({
            id: 'housing-debt-warning',
            title: 'High Debt-to-Income Ratio Detected',
            description: `Your DTI is ${(this.profile.debt.dtiRatio * 100).toFixed(1)}%. Consider reducing debt before applying for housing loans.`,
            priority: 'high',
            category: 'housing',
            actionUrl: '/tools/debt-calculator',
            completed: false
          });
        }
        
        if (this.profile.savings.emergencyFund < this.profile.savings.emergencyGoal * 0.5) {
          recommendations.push({
            id: 'housing-emergency-warning',
            title: 'Insufficient Emergency Fund',
            description: 'Build your emergency fund to at least 50% of your goal before major housing investments.',
            priority: 'medium',
            category: 'savings',
            actionUrl: '/tools/emergency-fund-calculator',
            completed: false
          });
        }
        break;

      case 'investment-calculator':
        if (this.profile.savings.emergencyFund < this.profile.savings.emergencyGoal) {
          recommendations.push({
            id: 'investment-emergency-first',
            title: 'Complete Emergency Fund First',
            description: 'Prioritize building your emergency fund before investing for better financial security.',
            priority: 'high',
            category: 'savings',
            actionUrl: '/tools/emergency-fund-calculator',
            completed: false
          });
        }
        break;

      case 'budget-calculator':
        const expenseRatio = this.profile.expenses.totalMonthly / this.profile.income.monthlyNet;
        if (expenseRatio > 0.8) {
          recommendations.push({
            id: 'budget-high-expenses',
            title: 'High Expense Ratio',
            description: `You're spending ${(expenseRatio * 100).toFixed(1)}% of your income. Consider reducing variable expenses.`,
            priority: 'high',
            category: 'budget',
            completed: false
          });
        }
        break;
    }

    return recommendations;
  }

  // Pre-fill data for tools
  getPreFillDataForTool(toolName: string): Record<string, any> {
    if (!this.profile) return {};

    switch (toolName) {
      case 'budget-calculator':
        return {
          monthlyIncome: this.profile.income.monthlyNet || ''
        };
      
      case 'emergency-fund-calculator':
        return {
          monthlyExpenses: this.profile.expenses.totalMonthly || '',
          currentSavings: this.profile.savings.emergencyFund || ''
        };
      
      case 'investment-calculator':
        return {
          monthlyContribution: Math.max(0, this.profile.savings.monthlyContributions - this.profile.debt.monthlyPayments) || ''
        };
      
      case 'housing-calculator':
        return {
          monthlyIncome: this.profile.income.monthlyNet || '',
          existingDebts: this.profile.debt.monthlyPayments || ''
        };
      
      default:
        return {};
    }
  }

  // Get current profile
  getProfile(): FinancialSnapshot | null {
    return this.profile;
  }

  // Calculate risk flags
  private calculateRiskFlags(): void {
    if (!this.profile) return;

    this.profile.riskFlags = [];

    // DTI Risk
    if (this.profile.debt.dtiRatio > 0.4) {
      this.profile.riskFlags.push({
        type: 'debt',
        severity: this.profile.debt.dtiRatio > 0.6 ? 'critical' : 'high',
        message: `Debt-to-income ratio is ${(this.profile.debt.dtiRatio * 100).toFixed(1)}%`,
        recommendation: 'Focus on debt reduction before taking on new financial commitments',
        affectedTools: ['housing-calculator', 'investment-calculator']
      });
    }

    // Emergency Fund Risk
    const emergencyRatio = this.profile.savings.emergencyFund / this.profile.savings.emergencyGoal;
    if (emergencyRatio < 0.3) {
      this.profile.riskFlags.push({
        type: 'emergency',
        severity: emergencyRatio < 0.1 ? 'critical' : 'high',
        message: `Emergency fund is only ${(emergencyRatio * 100).toFixed(1)}% of recommended amount`,
        recommendation: 'Prioritize building emergency fund to 3-6 months of expenses',
        affectedTools: ['investment-calculator', 'housing-calculator']
      });
    }

    // Budget Risk
    const expenseRatio = this.profile.expenses.totalMonthly / this.profile.income.monthlyNet;
    if (expenseRatio > 0.8) {
      this.profile.riskFlags.push({
        type: 'budget',
        severity: expenseRatio > 0.95 ? 'critical' : 'high',
        message: `Spending ${(expenseRatio * 100).toFixed(1)}% of income`,
        recommendation: 'Review and reduce variable expenses to improve financial flexibility',
        affectedTools: ['budget-calculator', 'savings-calculator']
      });
    }
  }

  private calculateDTI(): number {
    if (!this.profile || this.profile.income.monthlyNet === 0) return 0;
    return this.profile.debt.monthlyPayments / this.profile.income.monthlyNet;
  }

  private initializeProfile(): void {
    this.profile = {
      income: { monthlyNet: 0, frequency: 'monthly', sources: [] },
      expenses: { fixedCosts: 0, variableCosts: 0, debtPayments: 0, totalMonthly: 0 },
      savings: { emergencyFund: 0, emergencyGoal: 0, totalSavings: 0, monthlyContributions: 0 },
      debt: { totalDebt: 0, monthlyPayments: 0, dtiRatio: 0 },
      goals: {
        housing: { targetAmount: 0, currentSavings: 0, timeline: 0 },
        retirement: { targetAmount: 0, currentSavings: 0, monthlyContributions: 0 }
      },
      riskFlags: [],
      lastUpdated: new Date()
    };
  }

  private persistProfile(): void {
    if (typeof window !== 'undefined' && this.profile) {
      localStorage.setItem('pesowise-financial-profile', JSON.stringify(this.profile));
    }
  }

  loadPersistedProfile(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pesowise-financial-profile');
      if (stored) {
        try {
          this.profile = JSON.parse(stored);
          if (this.profile) {
            this.profile.lastUpdated = new Date(this.profile.lastUpdated);
          }
        } catch (error) {
          console.warn('Failed to load persisted financial profile:', error);
          this.initializeProfile();
        }
      }
    }
  }
}

// Export singleton instance
export const profileEngine = FinancialProfileEngine.getInstance();