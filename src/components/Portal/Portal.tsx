import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import { usePortal } from '@/components/Portal/usePortal';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';
import { PositionType } from '@/types/position';

export interface PortalProps extends React.ComponentProps<'div'> {
  ref: React.ForwardedRef<HTMLDivElement>;
  width?: React.CSSProperties['width'];
  disabledBG?: boolean;
  disabledAutoFocus?: boolean;
}

const Portal = ({ children, ref, width, onKeyDown, disabledAutoFocus, ...props }: PortalProps) => {
  const portalRef = React.useRef<HTMLDivElement>(null);
  const { showModal, toggleElement, reorgPos } = usePortal({ portalRef });
  const [items, setItems] = useState<HTMLElement[]>([]);

  const ACTIONS: Record<string, (e: React.KeyboardEvent<HTMLInputElement>) => void> = {
    ArrowDown: () => focus('next'),
    ArrowUp: () => focus('prev'),
    Tab: () => focus('next'),
    Enter: () => select(),
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const handler = ACTIONS[e.key];

    if (handler) {
      e.preventDefault();
      handler(e);
    }
  };

  const focus = (key: 'next' | 'prev'): void => {
    if (!items.length) return;

    const { activeElement } = document;

    if (activeElement instanceof HTMLElement) {
      let idx = items.indexOf(activeElement);
      if (key === 'next') idx = (idx + 1) % items.length;
      else idx = (idx - 1 + items.length) % items.length;

      const nextElement = items[idx] as HTMLElement;
      if (nextElement) nextElement.focus();
    }
  };

  const select = () => {
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

      const newItems = Array.from(
        portalRef.current.querySelectorAll<HTMLElement>('[data-focus-enabled="true"]'),
      ).filter(e => {
        return e.getAttribute('disabled') == null;
      });
      setItems(newItems);
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

const enterAnimation = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; } 
`;

const PortalStyled = styled.div<{ width?: React.CSSProperties['width']; position: PositionType }>`
  display: grid;
  min-width: max-content;
  ${({ width }) => width && `width: ${typeof width === 'string' ? width : `${width}px`};`}
  max-width: 100%;
  padding: 0.25rem;
  border-radius: 0.25rem;
  position: fixed;
  top: 0px;
  left: 0px;
  transform: ${({ position }) => `translate(${position.x}px, ${position.y}px)`};
  background-color: white;
  pointer-events: auto;
  z-index: 50;
  animation-name: ${enterAnimation};
  animation-duration: 0.15s;
  border: 1px solid var(--gray-300);
  box-shadow: 0px 2px 2px 0px var(--gray-300);
  &:focus {
    outline: none;
  }
`;
