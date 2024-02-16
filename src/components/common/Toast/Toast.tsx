import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { DefaultVariantType } from '@/types/variant';

import { useToast } from '.';
import { ToastData } from './type';

interface ToastProps extends React.ComponentPropsWithoutRef<'li'> {
  toast: ToastData;
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
      data-toastData={data}
      {...props}
    >
      {title && <ToastTitle>{title}</ToastTitle>}
      {description && <ToastDescription>{description}</ToastDescription>}
    </ToastStyled>
  );
});
Toast.displayName = 'Toast';

const ToastVariantStyles = ({ theme, variant }: { theme: Theme; variant: DefaultVariantType }) => {
  switch (variant) {
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
      `;
    case 'danger':
      return css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.danger};
      `;
    case 'warning':
      return css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.warning};
      `;
    case 'primary':
      return css`
        color: white;
        background-color: ${theme.colors.primary};
      `;
    default:
      return css`
        color: ${theme.colors.black};
        background-color: ${theme.colors.background};
      `;
  }
};

const ToastStyled = styled.li<{ variant?: DefaultVariantType }>`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray['200']};

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  box-shadow: 0 0px 3px ${({ theme }) => theme.colors.gray['400']};

  transform: translateX(calc(100% + 2rem));
  transition: all 0.25s cubic-bezier(0.75, -0.5, 0.25, 1.25);
  cursor: pointer;
  &.active {
    transform: translateX(0);
  }
  ${({ theme, variant }) => variant && ToastVariantStyles({ theme, variant })}
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