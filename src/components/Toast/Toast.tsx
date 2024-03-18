import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { DefaultVariantType } from '@/types/variant';

import { useToast } from '.';
import { ToastData, ToastPosition } from './type';

interface ToastProps extends React.ComponentPropsWithoutRef<'li'> {
  toast: ToastData;
  position: ToastPosition;
}

export const Toast = React.forwardRef<HTMLLIElement, ToastProps>(({ toast, ...props }, ref) => {
  const { toastId, variant = 'default', title, description, time = -1, action, data } = toast;
  const [active, setActive] = React.useState<boolean>(false);
  const { removeToast } = useToast();

  React.useEffect(() => {
    setActive(true);

    if (time >= 0) {
      const timer = setTimeout(() => {
        close();
      }, time);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastId, time]);

  const close = () => {
    setActive(false);

    setTimeout(() => {
      removeToast(toastId);
    }, 500);
  };

  return (
    <ToastStyled
      ref={ref}
      variant={variant}
      className={active ? 'active' : ''}
      onClick={() => {
        if (action) action(data);
        close();
      }}
      data-toastdata={data}
      {...props}
    >
      {title && <ToastTitle>{title}</ToastTitle>}
      {description && <ToastDescription>{description}</ToastDescription>}
    </ToastStyled>
  );
});
Toast.displayName = 'Toast';

const ToastVariantStyles = ({ variant }: { variant: DefaultVariantType }) => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: var(--secondary);
      `;
    case 'danger':
      return css`
        color: var(--white);
        background-color: var(--danger);
      `;
    case 'warning':
      return css`
        color: var(--white);
        background-color: var(--warning);
      `;
    case 'primary':
      return css`
        color: white;
        background-color: var(--primary);
      `;
    default:
      return css`
        color: var(--black);
        background-color: var(--background);
      `;
  }
};

const ToastPositionStyles = ({ position }: { position: ToastPosition }) => {
  switch (position) {
    case 'top-left':
      return css`
        transform: translateX(calc(-100% - 2rem));
      `;
    case 'top-center':
      return css`
        transform: translateY(-100vh);
      `;
    case 'top-right':
      return css`
        transform: translateX(calc(100% + 2rem));
      `;
    case 'bottom-left':
      return css`
        transform: translateX(calc(-100% - 2rem));
      `;
    case 'bottom-center':
      return css`
        transform: translateY(100vh);
      `;
    case 'bottom-right':
    default:
      return css`
        transform: translateX(calc(100% + 2rem));
      `;
  }
};

const ToastStyled = styled.li<{ variant?: DefaultVariantType; position?: ToastPosition }>`
  padding: 1rem;
  background-color: var(--white);
  border-radius: 0.5rem;
  border: 1px solid var(--gray-200);

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  box-shadow: 0 0px 3px var(--gray-400);
  transition: transform 0.25s cubic-bezier(0.75, -0.5, 0.25, 1.25);

  cursor: pointer;
  &.active {
    transform: translateX(0) translateY(0);
  }
  ${({ variant }) => variant && ToastVariantStyles({ variant })}
  ${({ position }) => position && ToastPositionStyles({ position })}
`;

export const ToastTitle = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
`;
export const ToastDescription = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
`;
