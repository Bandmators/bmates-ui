import GlobalStyle from '@/styles/GlobalStyle.tsx';
import { PropsWithChildren } from 'react';

const StyledProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};
export default StyledProvider;
