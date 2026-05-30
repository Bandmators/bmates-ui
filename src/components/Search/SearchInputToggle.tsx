import * as React from 'react';

import { Input } from '@/components/Input';
import { PortalContext } from '@/components/Portal/PortalContext';
import { getEnabledPortalItems } from '@/components/Portal/focus';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E>;

/**
 * SearchInputToggle
 * @returns
 */
export const SearchInputToggle = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ onClick, onChange, onKeyDown, ...props }, ref) => {
    const { showModal, setShowModal, setToggleElment, focusItems } = useContext(PortalContext);
    const compRef = React.useRef<HTMLInputElement | null>(null);

    const openModal = () => {
      if (showModal) return;

      if (compRef.current) {
        const rect = compRef.current;
        setToggleElment(rect);
      }

      setShowModal(true);
    };

    const closeModal = React.useCallback(() => {
      setShowModal(false);
    }, [setShowModal]);

    const ACTIONS: Record<string, (e: React.KeyboardEvent<HTMLInputElement>) => void> = {
      ArrowDown: () => focus('next'),
      ArrowUp: () => focus('prev'),
      Tab: () => closeModal(),
      Enter: () => focus('next'),
      Escape: () => closeModal(),
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const handler = ACTIONS[e.key];

      if (handler) {
        // e.preventDefault();
        handler(e);
      }
    };

    const focus = (key: 'next' | 'prev'): void => {
      const items = getEnabledPortalItems(focusItems);
      if (!items.length) return;

      if (key === 'next') {
        items[0]?.element.focus();
        return;
      }

      items[items.length - 1]?.element.focus();
    };

    return (
      <Input
        ref={composeRefs(compRef, ref)}
        aria-haspopup="true"
        onClick={composeEventHandlers(openModal, onClick)}
        onChange={composeEventHandlers(openModal, onChange)}
        onKeyDown={composeEventHandlers(onKeyDown, handleOnKeyDown)}
        {...props}
      />
    );
  },
);
SearchInputToggle.displayName = 'SearchInputToggle';
