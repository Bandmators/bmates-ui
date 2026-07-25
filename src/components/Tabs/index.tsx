import { cx } from '@/styles/classnames';
import * as React from 'react';

import { SizeType } from '@/types/size';

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
  size: SizeType;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tabs components must be used inside Tabs.');
  return context;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  value?: string;
  defaultValue: string;
  onValueChange?: (value: string) => void;
  size?: SizeType;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue, onValueChange, size = 'md', children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const selectedValue = value ?? uncontrolledValue;
    const reactId = React.useId().replace(/:/g, '');

    const setValue = React.useCallback(
      (nextValue: string) => {
        if (value === undefined) setUncontrolledValue(nextValue);
        onValueChange?.(nextValue);
      },
      [onValueChange, value],
    );

    return (
      <TabsContext.Provider value={{ value: selectedValue, setValue, baseId: `bm-tabs-${reactId}`, size }}>
        <div ref={ref} className={cx('bm-tabs', `bm-tabs--size-${size}`, className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx('bm-tabs__list', className)} role="tablist" {...props} />
  ),
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, onKeyDown, disabled, children, ...props }, ref) => {
    const { value: selectedValue, setValue, baseId, size } = useTabsContext();
    const selected = selectedValue === value;
    const triggerId = `${baseId}-trigger-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        type="button"
        className={cx(
          'bm-tabs__trigger',
          `bm-tabs__trigger--size-${size}`,
          selected && 'bm-tabs__trigger--active',
          className,
        )}
        role="tab"
        id={triggerId}
        aria-selected={selected}
        aria-controls={panelId}
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        onClick={event => {
          onClick?.(event);
          if (!event.defaultPrevented) setValue(value);
        }}
        onKeyDown={event => {
          onKeyDown?.(event);
          if (event.defaultPrevented || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

          const triggers = Array.from(
            event.currentTarget
              .closest('[role="tablist"]')
              ?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
          );
          const currentIndex = triggers.indexOf(event.currentTarget);
          const nextIndex =
            event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? triggers.length - 1
                : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + triggers.length) % triggers.length;
          const nextTrigger = triggers[nextIndex];
          nextTrigger?.focus();
          nextTrigger?.click();
          event.preventDefault();
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, baseId } = useTabsContext();
    const selected = selectedValue === value;

    return (
      <div
        ref={ref}
        className={cx('bm-tabs__content', className)}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        hidden={!selected}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';
