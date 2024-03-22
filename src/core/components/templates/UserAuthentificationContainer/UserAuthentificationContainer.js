'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { transitions } from '@/crossroad-client/src/core/components/navigation/TransitionPage';

// Main page component with authentification.
export const UserAuthentificationContainer = props => {
  let {
    homePageUrl,
    fallBackUrl = homePageUrl,
    url = fallBackUrl,
    checkAuthenticated,
    isAuthenticated = true,
    children,
  } = props || {};
  // Normalize input.
  Array.isArray(children || (children = [])) || (children = [children]);
  url || (url = '/home');
  typeof checkAuthenticated === 'function' && (isAuthenticated = checkAuthenticated());

  // Check for authentification.
  const router = useRouter();

  // Render.
  if (isAuthenticated) {
    transitions.instant();
    router.push(url);
    return null;
  }
  return <>{...children}</>;
}

// Default export.
export default UserAuthentificationContainer;