import styled from '@emotion/styled';
import React, { ComponentPropsWithoutRef } from 'react';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /*
    Card Width
  */
  width?: number;
}

const CardStyled = styled.div<CardProps>`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--background);
  box-shadow: 0 0 4px var(--gray-300);
  ${({ width }) => width && `width: ${width}px`};
`;

export const CardHead = styled.div`
  margin-bottom: 1rem;
`;
export const CardBody = styled.div``;
export const CardFooter = styled.div`
  margin-top: 1rem;
`;

export const CardTitle = styled.h3`
  margin: 0px;
`;
export const CardDesc = styled.p`
  margin: 0px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--gray-500);
`;
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, width, ...props }, ref) => (
  <CardStyled ref={ref} className={className} width={width} {...props} />
));
Card.displayName = 'Card';
