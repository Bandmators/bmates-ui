import styled from '@emotion/styled';

/* eslint-disable react-refresh/only-export-components */
export * from './Dialog';
export * from './DialogContent';
export * from './DialogToggle';
export * from './DialogClose';

export const DialogHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DialogFooter = styled.div<{ justify?: React.CSSProperties['justifyContent'] }>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: ${({ justify }) => justify || 'flex-end'};
`;

export const DialogTitle = styled.h2`
  font-weight: 600;
  line-height: 1;
  margin: 0px;
`;
export const DialogDescription = styled.p`
  margin: 0.375rem 0px;
  font-weight: 300;
`;
