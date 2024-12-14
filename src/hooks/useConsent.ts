import { useState, useCallback } from 'react';

export function useConsent() {
  const [hasConsented, setHasConsented] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleConsent = useCallback(async () => {
    setIsTransitioning(true);
    
    // フェードアウトのための待機
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 状態の更新
    setHasConsented(true);
    
    // フェードインのための遅延
    await new Promise(resolve => setTimeout(resolve, 50));
    setIsTransitioning(false);
  }, []);

  return {
    hasConsented,
    isTransitioning,
    handleConsent,
  };
}