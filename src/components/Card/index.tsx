import { cx } from '@/styles/panda';
import React, { ComponentPropsWithoutRef } from 'react';

import {
  cardBodyRecipe,
  cardDescRecipe,
  cardFooterRecipe,
  cardHeadRecipe,
  cardRecipe,
  cardTitleRecipe,
} from './card.recipe';

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  width?: number;
}

export const CardHead = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(cardHeadRecipe(), className)} {...props} />
);
export const CardBody = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(cardBodyRecipe(), className)} {...props} />
);
export const CardFooter = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cx(cardFooterRecipe(), className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentPropsWithoutRef<'h3'>) => (
  <h3 className={cx(cardTitleRecipe(), className)} {...props} />
);
export const CardDesc = ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
  <p className={cx(cardDescRecipe(), className)} {...props} />
);

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, width, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cx(cardRecipe(), className)}
    style={{ ...(style || {}), ...(width ? { width: `${width}px` } : {}) }}
    {...props}
  />
));
Card.displayName = 'Card';
