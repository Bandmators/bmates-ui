import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';

import Header from './Header';

const Container = styled.div``;

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};
export default AppLayout;
