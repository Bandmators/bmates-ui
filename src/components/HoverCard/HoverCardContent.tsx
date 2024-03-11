import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';

import useHoverWaiting from './useHoverWaiting';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * HoverCardContent
 * @returns
 */
export const HoverCardContent = React.forwardRef<HTMLDivElement, ModalProps>(({ width, children, ...props }, ref) => {
  const { onOpen, onClose } = useHoverWaiting();

  return (
    <PortalContent
      width={width}
      ref={ref}
      disabledBG
      onPointerEnter={composeEventHandlers(props.onPointerEnter, excludeTouchEventHandler(onOpen))}
      onPointerLeave={composeEventHandlers(props.onPointerLeave, excludeTouchEventHandler(onClose))}
      {...props}
    >
      {children}
    </PortalContent>
  );
});
HoverCardContent.displayName = 'HoverCardContent';
