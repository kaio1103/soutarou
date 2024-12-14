import { useEffect } from 'react';
import { FADE_DURATION } from '../constants/limits';

const FADE_START_DELAY = 1000; // 1秒待機

export function useFadeIn() {
  useEffect(() => {
    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'fixed inset-0 bg-white z-50 transition-opacity';
    document.body.appendChild(fadeOverlay);

    // すべての画像の読み込みを待つ
    const images = Array.from(document.getElementsByTagName('img'));
    const imageLoadPromises = images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    // すべての画像が読み込まれた後、1秒待ってからフェードアウトを開始
    Promise.all(imageLoadPromises).then(() => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          fadeOverlay.style.transitionDuration = `${FADE_DURATION}ms`;
          fadeOverlay.style.opacity = '0';

          setTimeout(() => {
            fadeOverlay.remove();
          }, FADE_DURATION);
        });
      }, FADE_START_DELAY);
    });

    return () => {
      fadeOverlay.remove();
    };
  }, []);
}