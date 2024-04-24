import styled from '@emotion/styled';

/* eslint-disable react-refresh/only-export-components */
export * from './Search';
export * from './SearchContent';
export * from './SearchToggle';
export * from './SearchItem';
export * from './SearchInput';
export * from './SearchInputToggle';

export const SearchLabel = styled.h3`
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.375rem 0.5rem;
  margin: 0px;
`;

export const SearchDivider = styled.div`
  height: 1px;
  margin: 0.25rem -0.25rem;
  background: var(--gray-300);
`;
export const SearchDescription = styled.p`
  margin: 0.375rem 0px;
  font-weight: 300;
`;

export const SearchShortcut = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1rem;
  margin-left: auto;
  opacity: 0.5;
`;

export const SearchItemList = styled.ul`
  margin: 0px;
  padding: 0px;
`;
