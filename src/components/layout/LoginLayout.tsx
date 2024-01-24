import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

const Container = styled.div`
  margin: 0 auto;
`;

const LoginLayout = ({ children }: PropsWithChildren) => {
  return <Container>{children}</Container>;
};
export default LoginLayout;
