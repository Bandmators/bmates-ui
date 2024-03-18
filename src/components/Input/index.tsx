import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

export { default as InputGroup } from './InputGroup';
export { default as InputDesc } from './InputDesc';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

const StyledInput = styled.input<{ disabled: boolean }>`
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.375rem 0.75rem;
  background-color: transparent;
  border-radius: 0.375rem;
  border: 1px solid var(--gray-300);
  outline: none;
  width: 100%;
  font-weight: inherit;
  color: var(--black);

  &:focus {
    border-color: var(--focus-border);
    box-shadow: var(--focus-shadow);
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      background-color: var(--gray-100);
      cursor: not-allowed;
    `}
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled = false, ...props }, ref) => {
    return <StyledInput type={type} className={className} ref={ref} disabled={disabled} {...props} />;
  },
);
Input.displayName = 'Input';
