import styled from '@emotion/styled';

/* eslint-disable react-refresh/only-export-components */
export * from './Dropdown';
export * from './DropdownContent';
export * from './DropdownToggle';
export * from './DropdownItem';

export const DropdownLabel = styled.h2`
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.375rem 0.5rem;
  margin: 0px;
`;

export const DropdownDivider = styled.div`
  height: 1px;
  margin: 0.25rem -0.25rem;
  background: var(--gray-300);
`;
export const DropdownDescription = styled.p`
  margin: 0.375rem 0px;
  font-weight: 300;
`;

export const DropdownShortcut = styled.span`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1rem;
  margin-left: auto;
  opacity: 0.5;
`;
