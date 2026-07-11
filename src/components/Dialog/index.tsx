import { cx } from '@/styles/panda';

import { dialogDescriptionRecipe, dialogFooterRecipe, dialogHeaderRecipe, dialogTitleRecipe } from './dialog.recipe';

export * from './Dialog';
export * from './DialogContent';
export * from './DialogToggle';
export * from './DialogClose';

export const DialogHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(dialogHeaderRecipe(), className)} {...props} />
);

export const DialogFooter = ({
  className,
  justify,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { justify?: React.CSSProperties['justifyContent'] }) => (
  <div
    className={cx(dialogFooterRecipe({ justify: justify === 'flex-start' ? 'start' : 'end' }), className)}
    {...props}
  />
);

export const DialogTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2 className={cx(dialogTitleRecipe(), className)} {...props} />
);
export const DialogDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => (
  <p className={cx(dialogDescriptionRecipe(), className)} {...props} />
);
