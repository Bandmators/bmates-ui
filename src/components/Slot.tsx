import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';

export type AsChildProps<T> = ({ asChild?: false } & T) | { asChild: true; children: React.ReactNode };

interface SlotProps extends React.HTMLProps<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = ({ children, ...props }: SlotProps) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(props, children.props),
    });
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }

  return null;
};
export default Slot;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;
const mergeProps = (slotProps: AnyProps, childProps: AnyProps) => {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotValue = slotProps[propName];
    const childValue = childProps[propName];

    // on** Event compose
    if (/^on[A-Z]/.test(propName)) {
      if (slotValue && childValue) {
        overrideProps[propName] = (...args: unknown[]) => composeEventHandlers(childValue(...args), slotValue(...args));
      } else if (slotValue) {
        overrideProps[propName] = slotValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotValue, ...childValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotValue, childValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
};
