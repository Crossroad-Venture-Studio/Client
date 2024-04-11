'use client';

import setDynamicViewPortSize from '../../../utils/setDynamicViewPortSize';
import { useEffect } from 'react';

// App container.
let hasViewportHandler;
export const DynamicViewportContainer = ({children}) => {

  useEffect(() => {
    hasViewportHandler || (
      setDynamicViewPortSize(),
      hasViewportHandler = true
    );
  }, []);

  return <>
    {children}
  </>;
}

// Default export.
export default DynamicViewportContainer;