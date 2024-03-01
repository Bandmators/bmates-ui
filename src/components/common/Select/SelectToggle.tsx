import styled from '@emotion/styled';
import * as React from 'react';

import Slot from '@/components/Slot';
import useContext from '@/hooks/useContext';
import { composeEventHandlers } from '@/libs/event';
import { composeRefs } from '@/libs/ref';

import { Button } from '..';
import SelectContext from './SelectContext';

type ComponentPropsWithoutRef<E extends React.ElementType> = React.ComponentPropsWithoutRef<E> & {
  asChild?: boolean;
};

/**
 * SelectToggle
 * @returns
 */
export const SelectToggle = React.forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ asChild, onClick, children, ...props }, ref) => {
    const { setShowModal, setToggleRect, selectedValue } = useContext(SelectContext);
    const compRef = React.useRef<HTMLButtonElement | null>(null);

    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        ref={composeRefs(compRef, ref)}
        onClick={composeEventHandlers(onClick, () => {
          if (compRef.current) {
            const rect = compRef.current.getBoundingClientRect();
            setToggleRect(rect);
          }

          setShowModal(true);
        })}
        aria-haspopup="true"
        aria-expanded="true"
        {...props}
      >
        <SelectToggleContent>
          {selectedValue.length > 0 ? selectedValue.map(val => val.name).join(',') : children}
        </SelectToggleContent>
        <SelectDownIconWrapper>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </SelectDownIconWrapper>
      </Comp>
    );
  },
);
SelectToggle.displayName = 'SelectToggle';

const SelectDownIconWrapper = styled.div`
  margin-left: auto;
  padding-left: 1rem;
  display: flex;
  align-items: center;
`;
const SelectToggleContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
