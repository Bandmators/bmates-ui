import * as React from 'react';

export const canUseDOM = typeof window !== 'undefined' && typeof document !== 'undefined';

export const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;
