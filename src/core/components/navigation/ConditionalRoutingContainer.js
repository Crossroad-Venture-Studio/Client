'use client';

// Imports.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { transitions } from './TransitionPage';

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

  // Check for authentification.
  const router = useRouter(), [met, setMet] = useState();

  useEffect(() => {
    typeof condition === 'function' && (condition = condition());
    setMet(condition);
    console.log('met', met, condition);
  }, [])

  // Render.
  return met && <>{...children}</> || (
    typeof transition === 'object' && (transition = transitions.custom(transition)),
    transition(),
    router.push(url),
    fallBackComponent || null
  );
}

// Default export.
export default ConditionalRoutingContainer;