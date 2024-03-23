'use client';

// Imports.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { transitions } from './TransitionPage';

// Main page component with authentification.
export const ConditionalRoutingContainer = props => {
  let {
    fallbackUrl,
    url = fallbackUrl,
    fallbackComponent,
    condition = true,
    transition = transitions.instant,
    children,
  } = props || {};
  // Normalize input.
  Array.isArray(children || (children = [])) || (children = [children]);

  // Check for authentification.
  const [conditionMet, setConditionMet] = useState(false), router = useRouter();
  useEffect(() => {
    typeof condition === 'function' && (condition = condition());
    condition ? setConditionMet(true) : (
      typeof transition === 'object' && (transition = transitions.custom(transition)),
      transition(),
      router.push(url || '/')
    );
  }, []);

  // Render.
  return conditionMet && <>{...children}</> || fallbackComponent || null;
}

// Default export.
export default ConditionalRoutingContainer;