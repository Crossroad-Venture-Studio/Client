'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { transitions } from '../core/components/navigation/TransitionPage/transitions';
import Platform from '../core/native/Platform';

// Helper function to create an onBack callback.
export const createOnBack = (callback, fallbackUrl, transition = 'slideOut') => {
  const router = useRouter();
  
  return (...args) => {
    transitions.setCurrentTransition(transition);
    typeof callback === 'function' && callback(...args);
    if (Platform.window.history && Platform.window.history.length) {
      router.back();
    } else {
        router.push(fallbackUrl || '/');
    }
  };
}

// Default export.
export default createOnBack;