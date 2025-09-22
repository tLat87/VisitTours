import { useState } from 'react';

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Onboarding always shows
  const completeOnboarding = async () => {
    // Simply go to main app
    setIsOnboardingComplete(true);
  };

  const resetOnboarding = async () => {
    // Reset to onboarding
    setIsOnboardingComplete(false);
  };

  return {
    isOnboardingComplete,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
};

