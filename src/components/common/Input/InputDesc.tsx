import styled from '@emotion/styled';
import * as React from 'react';

export interface InputGroupProps extends React.ComponentProps<'p'> {}

const StyledInputDesc = styled.p`
  margin: 0px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.gray['500']};
`;

const InputDesc = ({ className, ...props }: InputGroupProps) => {
  return <StyledInputDesc className={className} {...props} />;
};
export default InputDesc;
