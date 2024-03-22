'use client';

// Imports.
import { useRouter } from 'next/navigation';
import { transitions } from '../navigation/TransitionPage';

// Main page component with authentification.
export const ConditionalRoutingContainer = props => {
  let {
    fallBackUrl,
    url = fallBackUrl,
    fallBackComponent,
    condition = true,
    transition = transitions.instant,
    children,
  } = props || {};
  // Normalize input.
  Array.isArray(children || (children = [])) || (children = [children]);
  url || (url = '/');
  typeof condition === 'function' && (condition = condition());
  typeof transition === 'object' && (transition = transitions.custom(transition));
  transition();

  // Check for authentification.
  const router = useRouter();

  // Render.
  return condition && <>{...children}</> || (
    transition(),
    router.push(url),
    fallBackComponent || null
  );
}

// Default export.
export default ConditionalRoutingContainer;