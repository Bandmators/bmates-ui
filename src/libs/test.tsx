import { RenderOptions, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';

import StyledProvider from '../components/provider/StyledProvider';

export const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <StyledProvider>{children}</StyledProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

export { customRender as render };

export const MockRouter = ({ initialPath = '/', children }: { initialPath: string; children: React.ReactNode }) => {
  return (
    <MemoryRouter initialEntries={[initialPath]} initialIndex={0}>
      <Routes>{children}</Routes>
    </MemoryRouter>
  );
};
