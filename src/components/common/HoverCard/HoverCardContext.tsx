import * as React from 'react';

interface HoverCardContextType {
  timer: React.MutableRefObject<NodeJS.Timeout | null>;
  openDelay: number;
  closeDelay: number;
}
const HoverCardContext = React.createContext<HoverCardContextType | null>(null);
export default HoverCardContext;
