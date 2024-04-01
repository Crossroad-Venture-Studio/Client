'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { transitions } from './TransitionPage';

// Helper function to create an onBack callback.
export const createOnBack = (callback, transition = 'slideOut') => {
  const router = useRouter();
  
  return (...args) => {
    transitions.setCurrentTransition(transition);
    typeof callback === 'function' && callback(...args);
    router.back();
  };
}

// Default export.
export default createOnBack;