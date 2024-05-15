import * as React from 'react';

import { Input } from '@/components/Input';
import { PortalContext } from '@/components/Portal/PortalContext';
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
    const { showModal, setShowModal, setToggleElment } = useContext(PortalContext);
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
    }, []);

    const ACTIONS: Record<string, (e: React.KeyboardEvent<HTMLInputElement>) => void> = {
      ArrowDown: () => focus('next'),
      ArrowUp: () => focus('prev'),
      Tab: () => closeModal(),
      Enter: () => focus('next'),
      Escape: () => closeModal(),
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e);
      const handler = ACTIONS[e.key];

      if (handler) {
        // e.preventDefault();
        handler(e);
      }
    };

    const focus = (key: 'next' | 'prev'): void => {
      const el = document.querySelector('#bmates-portal [data-focus-enabled="true"]') as HTMLElement;
      if (key === 'next' && el) el.focus();
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
