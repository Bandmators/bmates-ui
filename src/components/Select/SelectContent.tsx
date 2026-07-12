import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContent } from '@/components/Portal/PortalContent';
import { PortalContext } from '@/components/Portal/PortalContext';
import useContext from '@/hooks/useContext';
import { composeEventHandlers, excludeTouchEventHandler } from '@/libs/event';

import { selectListBoxRecipe } from './select.recipe';

interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  width?: React.CSSProperties['width'];
}

/**
 * SelectContent
 * @returns
 */
export const SelectContent = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ width, children, onPointerEnter, onPointerLeave, ...props }, ref) => {
    const { hoverOpen, openHover } = useContext(PortalContext);

    return (
      <PortalContent
        width={width}
        ref={ref}
        disabledBG={hoverOpen}
        onPointerEnter={composeEventHandlers(
          onPointerEnter,
          excludeTouchEventHandler(() => hoverOpen && openHover()),
        )}
        onPointerLeave={composeEventHandlers(
          onPointerLeave,
          excludeTouchEventHandler(() => {
            // closed by portal-level pointer tracking
          }),
        )}
        {...props}
      >
        <ul role="listbox" className={cx(selectListBoxRecipe())}>
          {children}
        </ul>
      </PortalContent>
    );
  },
);
SelectContent.displayName = 'SelectContent';
