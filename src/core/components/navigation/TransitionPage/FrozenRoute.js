'use client';

import { useContext, useRef } from 'react';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const FrozenRoute = ({ children, freeze }) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return freeze && <LayoutRouterContext.Provider
    value={frozen}
  >
      {children}
  </LayoutRouterContext.Provider> || <>
    {children}
  </>;
}

export default FrozenRoute;