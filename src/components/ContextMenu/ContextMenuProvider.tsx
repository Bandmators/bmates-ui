import * as React from 'react';

import { PortalProvider } from '@/components/Portal/PortalProvider';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';
import { AlignType } from '@/types/align';

import { PortalContext } from '../Portal/PortalContext';

interface ContextMenuProviderProps extends React.PropsWithChildren {
  align?: AlignType;
  space?: number;
}

/**
 * Displays a list of menus.
 * @returns
 */
export const ContextMenuProvider = ({ align = 'start', space = 0, children }: ContextMenuProviderProps) => {
  return (
    <PortalProvider align={align} space={space}>
      <ContextMenuContainer>{children}</ContextMenuContainer>
    </PortalProvider>
  );
};

// interface ContextMenuContainerProps extends React.PropsWithChildren {}

export const ContextMenuContainer = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ onContextMenu, ...props }, ref) => {
    const { setShowModal, setReorgPos } = useContext(PortalContext);

    const compRef = React.useRef<HTMLDivElement | null>(null);
    return (
      <div
        ref={composeRefs(compRef, ref)}
        onContextMenu={composeEventHandlers(onContextMenu, evt => {
          console.log(evt.button);
          if (evt.button !== 2) return;
          evt.preventDefault();
          // if (compRef.current) {
          //   const rect = compRef.current;
          //   setToggleElment(rect);
          // }
          setReorgPos({ x: evt.clientX, y: evt.clientY });

          setShowModal(true);
        })}
        {...props}
      />
    );
  },
);
ContextMenuContainer.displayName = 'ContextMenuContainer';
