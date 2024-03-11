import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import useHoverWaiting from './useHoverWaiting';

/**
 * HoverCardToggle
 * @returns
 */
export const HoverCardToggle = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ ...props }, ref) => {
    const { setToggleElment } = useContext(PortalContext);
    const compRef = React.useRef<HTMLDivElement | null>(null);
    const { onOpen: onOpenWaiting, onClose } = useHoverWaiting();

    React.useEffect(() => {
      if (compRef.current) {
        const rect = compRef.current;
        setToggleElment(rect);
      }
    }, [setToggleElment]);

    const onOpen = () => {
      // if (compRef.current) {
      //   const rect = compRef.current;
      //   setToggleElment(rect);
      // }

      onOpenWaiting();
    };

    return (
      <div
        ref={composeRefs(compRef, ref)}
        onPointerEnter={composeEventHandlers(props.onPointerEnter, excludeTouchEventHandler(onOpen))}
        onPointerLeave={composeEventHandlers(props.onPointerLeave, excludeTouchEventHandler(onClose))}
        onFocus={composeEventHandlers(props.onFocus, onOpen)}
        onBlur={composeEventHandlers(props.onBlur, onClose)}
        // prevent focus event on touch devices
        onTouchStart={composeEventHandlers(props.onTouchStart, event => event.preventDefault())}
        {...props}
      />
    );
  },
);
HoverCardToggle.displayName = 'HoverCardToggle';
