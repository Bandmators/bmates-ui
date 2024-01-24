import GlobalStyle from '@/styles/GlobalStyle.tsx';
import theme from '@/styles/theme.ts';
import { ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';

const StyledProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
export default StyledProvider;
