import { cx } from '@/styles/panda';
import React from 'react';

import { getNextPortalItem } from '@/components/Portal/focus';
import { usePortal } from '@/components/Portal/usePortal';
import { canUseDOM } from '@/libs/dom';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { portalRecipe } from './portal.recipe';

export interface PortalProps extends React.ComponentProps<'div'> {
  ref: React.ForwardedRef<HTMLDivElement>;
  width?: React.CSSProperties['width'];
  disabledBG?: boolean;
  disabledAutoFocus?: boolean;
}

const Portal = ({ children, ref, width, onKeyDown, disabledAutoFocus, ...props }: PortalProps) => {
  const portalRef = React.useRef<HTMLDivElement>(null);
  const { showModal, setShowModal, toggleElement, reorgPos, focusItems } = usePortal({ portalRef });

  const ACTIONS: Record<string, (e: React.KeyboardEvent<HTMLInputElement>) => void> = {
    ArrowDown: () => focus('next'),
    ArrowUp: () => focus('prev'),
    Tab: () => focus('next'),
    Enter: () => select(),
    Escape: () => setShowModal(false),
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const handler = ACTIONS[e.key];

    if (handler) {
      e.preventDefault();
      handler(e);
    }
  };

  const focus = (key: 'next' | 'prev'): void => {
    if (!focusItems.length || !canUseDOM) return;

    const { activeElement } = document;

    const nextItem = getNextPortalItem(focusItems, activeElement instanceof HTMLElement ? activeElement : null, key);
    nextItem?.element.focus();
  };

  const select = () => {
    if (!canUseDOM) return;

    const { activeElement } = document;

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    activeElement?.dispatchEvent(clickEvent);
  };

  const handleOpen = React.useCallback(() => {
    if (portalRef.current) {
      if (!disabledAutoFocus) portalRef.current.focus();
    }
  }, [disabledAutoFocus]);

  React.useEffect(() => {
    if (showModal && portalRef.current) handleOpen();
  }, [handleOpen, showModal, children]);

  return (
    <PortalStyled
      ref={composeRefs(portalRef, ref)}
      width={width || toggleElement?.getBoundingClientRect().width}
      position={reorgPos}
      onKeyDown={composeEventHandlers(handleOnKeyDown, onKeyDown)}
      tabIndex={-1}
      {...props}
    >
      {children}
    </PortalStyled>
  );
};
export default Portal;

type PortalStyledProps = React.ComponentPropsWithoutRef<'div'> & {
  position: { x: number; y: number };
  width?: React.CSSProperties['width'];
};

const PortalStyled = React.forwardRef<HTMLDivElement, PortalStyledProps>(
  ({ position, width, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cx(portalRecipe(), className)}
      style={{
        ...(style || {}),
        transform: `translate(${position.x}px, ${position.y}px)`,
        ...(width ? { width: typeof width === 'string' ? width : `${width}px` } : {}),
      }}
      {...props}
    />
  ),
);
PortalStyled.displayName = 'PortalStyled';
