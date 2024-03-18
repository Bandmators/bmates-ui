import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {}

const StyledTextarea = styled.textarea`
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.375rem 0.75rem;
  background-color: transparent;
  border-radius: 0.375rem;
  border: 1px solid var(--gray-300);
  outline: none;
  width: 100%;
  font-weight: inherit;
  resize: vertical;
  color: var(--black);
  min-height: 2.25rem;

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

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return <StyledTextarea className={className} ref={ref} {...props} />;
});
Textarea.displayName = 'Textarea';
