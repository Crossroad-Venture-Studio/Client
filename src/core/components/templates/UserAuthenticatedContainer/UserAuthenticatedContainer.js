'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { transitions } from '@/crossroad-client/src/core/components/navigation/TransitionPage';

// Main page component with authentification.
export const UserAuthenticatedContainer = props => {
  let {
    authPageUrl,
    fallBackUrl = authPageUrl,
    url = fallBackUrl,
    checkAuthenticated,
    isAuthenticated = true,
    children,
  } = props || {};
  // Normalize input.
  Array.isArray(children || (children = [])) || (children = [children]);
  url || (url = '/');
  typeof checkAuthenticated === 'function' && (isAuthenticated = checkAuthenticated());

  // Check for authentification.
  const router = useRouter();

  // Render.
  if (isAuthenticated) return <>{...children}</>;
  transitions.instant();
  router.push(url);
  return null;
}

// Default export.
export default UserAuthenticatedContainer;