'use client';

import { useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect } from 'react';
import { usePresence } from 'framer-motion';

export const FrozenRoute = ({ children, freeze }) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    console.log('isPresent', isPresent);
    !isPresent && setTimeout(safeToRemove, 0);
  }, [isPresent]);

  return freeze && <LayoutRouterContext.Provider
    value={frozen}
  >
      {children}
  </LayoutRouterContext.Provider> || <>
    {children}
  </>;
}

export default FrozenRoute;