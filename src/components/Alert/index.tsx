import { cx } from '@/styles/classnames';
import * as React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends React.ComponentPropsWithoutRef<'div'> {
  variant?: AlertVariant;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', role = 'alert', ...props }, ref) => (
    <div ref={ref} className={cx('bm-alert', `bm-alert--${variant}`, className)} role={role} {...props} />
  ),
);
Alert.displayName = 'Alert';

export const AlertIcon = ({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
  <span className={cx('bm-alert__icon', className)} aria-hidden="true" {...props} />
);

export const AlertTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
  <p className={cx('bm-alert__title', className)} {...props} />
);

export const AlertDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx('bm-alert__description', className)} {...props} />
);
