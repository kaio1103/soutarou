import { useEffect } from 'react';
import { FADE_DURATION, RELOAD_DELAY } from '../constants/limits';

export function useFadeOutReload(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'fixed inset-0 bg-white opacity-0 pointer-events-none transition-opacity z-50';
    document.body.appendChild(fadeOverlay);

    // 20秒後にフェードアウトを開始
    const fadeTimeout = setTimeout(() => {
      fadeOverlay.style.transitionDuration = `${FADE_DURATION}ms`;
      fadeOverlay.style.opacity = '1';

      // フェードアウト完了後にページを再読み込み
      setTimeout(() => {
        window.location.reload();
      }, FADE_DURATION);
    }, RELOAD_DELAY);

    return () => {
      clearTimeout(fadeTimeout);
      fadeOverlay.remove();
    };
  }, [isLocked]);
}