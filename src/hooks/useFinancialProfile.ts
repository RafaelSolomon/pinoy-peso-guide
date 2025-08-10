import { useState, useEffect, useCallback } from 'react';
import { profileEngine, FinancialSnapshot } from '@/lib/profileEngine';

export const useFinancialProfile = (toolName?: string) => {
  const [profile, setProfile] = useState<FinancialSnapshot | null>(null);
  const [preFillData, setPreFillData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Load persisted profile on hook initialization
    profileEngine.loadPersistedProfile();
    const currentProfile = profileEngine.getProfile();
    setProfile(currentProfile);

    // Get pre-fill data for specific tool
    if (toolName && currentProfile) {
      const preData = profileEngine.getPreFillDataForTool(toolName);
      setPreFillData(preData);
    }
  }, [toolName]);

  const updateProfile = useCallback((updateData: any, sourceCalculator: string) => {
    switch (sourceCalculator) {
      case 'budget-calculator':
        profileEngine.updateFromBudgetCalculator(updateData);
        break;
      case 'emergency-fund-calculator':
        profileEngine.updateFromEmergencyFund(updateData);
        break;
      case 'debt-calculator':
        profileEngine.updateFromDebtCalculator(updateData);
        break;
      default:
        console.warn(`Unknown calculator type: ${sourceCalculator}`);
        return;
    }

    // Update local state
    setProfile(profileEngine.getProfile());
    
    // Update pre-fill data if needed
    if (toolName) {
      const newPreData = profileEngine.getPreFillDataForTool(toolName);
      setPreFillData(newPreData);
    }
  }, [toolName]);

  const getRecommendations = useCallback((forTool?: string) => {
    return profileEngine.getRecommendationsForTool(forTool || toolName || '');
  }, [toolName]);

  return {
    profile,
    preFillData,
    updateProfile,
    getRecommendations,
    hasProfile: !!profile
  };
};