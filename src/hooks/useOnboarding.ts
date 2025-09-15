import { useState } from 'react';

export const useOnboarding = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Онбординг всегда показывается
  const completeOnboarding = async () => {
    // Просто переходим к основному приложению
    setIsOnboardingComplete(true);
  };

  const resetOnboarding = async () => {
    // Сбрасываем на онбординг
    setIsOnboardingComplete(false);
  };

  return {
    isOnboardingComplete,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
};

