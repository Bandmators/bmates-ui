import { cx } from '@/styles/panda';
import * as React from 'react';

import { PortalContext } from '@/components/Portal/PortalContext';
import { usePortalFocusItem } from '@/components/Portal/usePortalFocusItem';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import SelectContext from './SelectContext';
import SelectIcon from './SelectIcon';
import { selectItemRecipe } from './select.recipe';

interface SelectItemProps extends React.ComponentPropsWithoutRef<'li'> {
  value: string | number | readonly string[];
  disabled?: boolean;
}

const extractText = (node: React.ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(' ').replace(/\s+/g, ' ').trim();
  if (React.isValidElement(node)) return extractText(node.props.children);
  return '';
};

export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ disabled = false, children, value, onClick, ...props }, ref) => {
    const { setShowModal } = useContext(PortalContext);
    const { selectedValue, setSelectedValue, multi } = useContext(SelectContext);
    const selected = selectedValue?.some(v => v.value === value) || false;
    const itemRef = React.useRef<HTMLLIElement>(null);

    usePortalFocusItem(itemRef, disabled);

    const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      setShowModal(false);

      if (selected) {
        setSelectedValue([...selectedValue.filter(val => val.value !== value)]);
      } else if (!multi) {
        setSelectedValue([
          {
            label: children,
            textValue: extractText(children),
            value: value,
          },
        ]);
      } else {
        setSelectedValue([
          ...selectedValue,
          {
            label: children,
            textValue: extractText(children),
            value: value,
          },
        ]);
      }
    };

    return (
      <li
        ref={composeRefs(itemRef, ref)}
        className={cx(selectItemRecipe({ selected, disabled }))}
        tabIndex={disabled ? -1 : 0}
        role={'option'}
        aria-selected={selected}
        aria-disabled={disabled}
        data-disabled={disabled}
        onClick={composeEventHandlers(onClick, onClickHandler)}
        {...props}
      >
        {children}
        {selected && <SelectIcon />}
      </li>
    );
  },
);
SelectItem.displayName = 'SelectItem';
