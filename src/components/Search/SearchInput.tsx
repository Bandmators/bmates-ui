import styled from '@emotion/styled';
import * as React from 'react';

import { Input } from '../Input';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

export const SearchInput = ({ ...props }: InputProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return <StyledInput ref={inputRef} {...props} />;
};

const StyledInput = styled(Input)`
  margin: 0.375rem 0.375rem;
  padding: 0.375rem 0.375rem;
  width: auto;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
`;
