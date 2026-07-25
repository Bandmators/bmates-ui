import { cx } from '@/styles/classnames';

export const buttonClasses = {
  root: 'bm-button',
  variant: {
    default: 'bm-button--variant-default',
    primary: 'bm-button--variant-primary',
    secondary: 'bm-button--variant-secondary',
    success: 'bm-button--variant-success',
    danger: 'bm-button--variant-danger',
    warning: 'bm-button--variant-warning',
    info: 'bm-button--variant-info',
    outline: 'bm-button--variant-outline',
    ghost: 'bm-button--variant-ghost',
  },
  size: {
    sm: 'bm-button--size-sm',
    md: 'bm-button--size-md',
    lg: 'bm-button--size-lg',
    icon: 'bm-button--size-icon',
  },
  full: 'bm-button--full',
} as const;

type ButtonRecipeOptions = {
  variant?: keyof typeof buttonClasses.variant;
  size?: keyof typeof buttonClasses.size;
  full?: boolean;
};

export const buttonRecipe = ({ variant = 'default', size = 'md', full = false }: ButtonRecipeOptions = {}) =>
  cx(buttonClasses.root, buttonClasses.variant[variant], buttonClasses.size[size], full && buttonClasses.full);
