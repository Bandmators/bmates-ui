import { cx } from '@/styles/panda';
import React from 'react';

import { composeEventHandlers } from '@/libs/event';

import { useToast } from '.';
import { toastDescriptionRecipe, toastRecipe, toastTitleRecipe } from './toast.recipe';
import { ToastData, ToastPosition } from './type';

interface ToastProps extends React.ComponentPropsWithoutRef<'li'> {
  toast: ToastData;
  position: ToastPosition;
}

export const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ toast, position, className, onClick, ...props }, ref) => {
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
      <li
        ref={ref}
        className={cx(toastRecipe({ variant, position, active }), className)}
        onClick={composeEventHandlers(onClick, () => {
          if (action) action(data);
          close();
        })}
        data-toastdata={data}
        {...props}
      >
        {title && <div className={toastTitleRecipe()}>{title}</div>}
        {description && <div className={toastDescriptionRecipe()}>{description}</div>}
      </li>
    );
  },
);
Toast.displayName = 'Toast';
// recipes provide styles
