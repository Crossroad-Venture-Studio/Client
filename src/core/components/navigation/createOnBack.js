'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { pageTransitions } from '@/crossroad-client/src/core/components/navigation';

// Helper function to create an onBack callback.
export const createOnBack = (callback, transition) => {
  const router = useRouter();
  
  return (...args) => {
    pageTransitions.setCurrentTransition(transition);
    typeof callback === 'function' && callback(...args);
    router.back();
  };
}

// Default export.
export default createOnBack;