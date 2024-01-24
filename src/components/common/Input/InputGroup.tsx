import styled from '@emotion/styled';
import * as React from 'react';

export interface InputGroupProps extends React.ComponentProps<'div'> {}

const StyledInputGroup = styled.div`
  display: grid;
  align-items: center;
  gap: 0.5rem;
`;

const InputGroup = ({ className, ...props }: InputGroupProps) => {
  return <StyledInputGroup className={className} {...props} />;
};
export default InputGroup;
