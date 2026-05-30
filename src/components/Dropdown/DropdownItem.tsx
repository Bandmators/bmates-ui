import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import { usePortalFocusItem } from '@/components/Portal/usePortalFocusItem';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { dropdownItemRecipe } from './dropdown.recipe';

interface DropdownItemProps extends React.ComponentPropsWithoutRef<'li'> {
  disabled?: boolean;
}
export const DropdownItem = React.forwardRef<HTMLLIElement, DropdownItemProps>(
  ({ disabled = false, onClick, className, ...props }, ref) => {
    const { setShowModal } = useContext(PortalContext);
    const itemRef = React.useRef<HTMLLIElement>(null);
    usePortalFocusItem(itemRef, disabled);

    const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      setShowModal(false);
    };

    return (
      <li
        ref={composeRefs(itemRef, ref)}
        tabIndex={disabled ? -1 : 0}
        role={'menuitem'}
        aria-disabled={disabled}
        data-disabled={disabled}
        className={cx(dropdownItemRecipe({ disabled }), className)}
        onClick={composeEventHandlers(onClick, onClickHandler)}
        {...props}
      ></li>
    );
  },
);
DropdownItem.displayName = 'DropdownItem';
