import * as React from 'react';

import { PortalProvider } from '@/components/portal/PortalProvider';
import { AlignType } from '@/types/align';

import HoverCardContext from './HoverCardContext';

interface HoverCardProps extends React.PropsWithChildren {
  align?: AlignType;
  space?: number;
  openDelay?: number;
  closeDelay?: number;
}

/**
 * Display content when hover toggle.
 * @returns
 */
export const HoverCard = ({
  align = 'center',
  space = 16,
  openDelay = 500,
  closeDelay = 200,
  children,
}: HoverCardProps) => {
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <PortalProvider align={align} space={space} enableScroll={false}>
      <HoverCardContext.Provider value={{ timer, openDelay, closeDelay }}>{children}</HoverCardContext.Provider>
    </PortalProvider>
  );
};
