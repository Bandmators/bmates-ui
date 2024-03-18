import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const tooltip = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1;}
`;
const TooltipTrigger = styled.div<{ direction?: Direction }>`
  display: none;
  position: absolute;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transform: scale(0.9);
  box-shadow: 0 2px 4px var(--black);
  color: var(--white);
  background-color: var(--black);
  animation: ${tooltip} 0.5s ease;
  z-index: 200;
  white-space: nowrap;

  ${props => {
    if (props.direction === 'top' || props.direction === 'bottom') {
      return 'left: calc(50% + 0.25rem); transform: translateX(calc(-50% - 4px));';
    }
    if (props.direction === 'left' || props.direction === 'right') {
      return 'top: calc(50% + 0.25rem); transform: translateY(calc(-50% - 4px));';
    }
  }}
  ${props => props.direction === 'top' && 'bottom: calc(100% + 0.5rem);'}
  ${props => props.direction === 'bottom' && 'top: calc(100% + 0.5rem);'}
  ${props => props.direction === 'left' && 'right: calc(100% + 0.5rem);'}
  ${props => props.direction === 'right' && 'left: calc(100% + 0.5rem);'}
`;

const TooltipStyled = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
`;

interface TooltipProps extends React.ComponentProps<'div'> {
  /*
    Tooltip message
  */
  message: string;
  /*
    Where to display Tooltip 
  */
  direction?: Direction;
}

type Direction = 'top' | 'bottom' | 'left' | 'right';

export const Tooltip = ({ children, message, direction = 'top', ...props }: TooltipProps) => {
  return (
    <TooltipStyled {...props}>
      {children}
      <TooltipTrigger className="tooltip" direction={direction}>
        {message}
      </TooltipTrigger>
    </TooltipStyled>
  );
};
