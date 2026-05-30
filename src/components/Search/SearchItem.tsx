import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import { usePortalFocusItem } from '@/components/Portal/usePortalFocusItem';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { searchItemRecipe } from './search.recipe';

interface SearchItemProps extends React.ComponentPropsWithoutRef<'li'> {
  disabled?: boolean;
}
export const SearchItem = React.forwardRef<HTMLLIElement, SearchItemProps>(({ disabled = false, ...props }, ref) => {
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
      onClick={composeEventHandlers(props.onClick, onClickHandler)}
      className={cx(searchItemRecipe({ disabled }), props.className)}
      {...props}
    />
  );
});
SearchItem.displayName = 'SearchItem';
