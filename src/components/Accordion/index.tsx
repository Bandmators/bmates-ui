import { cx } from '@/styles/panda';
import * as React from 'react';

import useContext from '@/hooks/useContext';
import useControllableState from '@/hooks/useControllableState';
import { useIsomorphicLayoutEffect } from '@/libs/dom';
import { composeEventHandlers } from '@/libs/event';

import {
  accordionContentInnerRecipe,
  accordionContentWrapperRecipe,
  accordionHeadRecipe,
  accordionIconRecipe,
  accordionIndicatorRecipe,
  accordionItemRecipe,
  accordionRootRecipe,
  accordionTitleRecipe,
} from './accordion.recipe';

interface AccordionContextType {
  openItems: string[];
  type: 'single' | 'multiple';
  toggle: (itemId: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);
AccordionContext.displayName = 'AccordionContext';

interface AccordionItemContextType {
  value: string;
  isOpen: boolean;
  disabled: boolean;
  toggle: (itemId: string) => void;
  contentId: string;
  triggerId: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);
AccordionItemContext.displayName = 'AccordionItemContext';

type AccordionSingleProps = {
  /*
	Accordion type: single (default)
  */
  type?: 'single';
  /*
    Default open accordion item value
  */
  defaultValue?: string;
} & React.ComponentPropsWithoutRef<'div'>;

type AccordionMultipleProps = {
  /*
	Accordion type: multiple
  */
  type: 'multiple';
  /*
    Default open accordion items values
  */
  defaultValue?: string[];
} & React.ComponentPropsWithoutRef<'div'>;

type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', defaultValue, children, ...props }, ref) => {
    const getInitialValue = (): string[] => {
      if (!defaultValue) return [];
      if (type === 'single') return typeof defaultValue === 'string' ? [defaultValue] : [];
      return Array.isArray(defaultValue) ? defaultValue : [];
    };

    const [openItems, setOpenItems] = useControllableState<string[]>({
      initValue: getInitialValue(),
    });

    const toggle = React.useCallback(
      (itemId: string) => {
        setOpenItems(prev => {
          if (type === 'single') {
            return prev.includes(itemId) ? [] : [itemId];
          } else {
            return prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId];
          }
        });
      },
      [type, setOpenItems],
    );

    return (
      <div ref={ref} className={cx(accordionRootRecipe(), className)} {...props}>
        <AccordionContext.Provider value={{ openItems, type, toggle }}>{children}</AccordionContext.Provider>
      </div>
    );
  },
);
Accordion.displayName = 'Accordion';

interface AccordionItemProps extends React.ComponentPropsWithoutRef<'div'> {
  /*
    Unique identifier for the accordion item
  */
  value: string;
  /*
	Item disabled status
  */
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { openItems, toggle } = useContext(AccordionContext);
    const isOpen = openItems.includes(value);
    const contentId = React.useId();
    const triggerId = React.useId();

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          isOpen,
          disabled,
          toggle,
          contentId: `accordion-content-${contentId}`,
          triggerId: `accordion-trigger-${triggerId}`,
        }}
      >
        <div
          ref={ref}
          className={cx(accordionItemRecipe(), className)}
          data-open={isOpen}
          data-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  /*
	Custom indicator element
  */
  indicator?: React.ReactNode;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, indicator, onClick, children, ...props }, ref) => {
    const { isOpen, disabled, toggle, value, contentId, triggerId } = useContext(AccordionItemContext);

    return (
      <button
        ref={ref}
        className={cx(accordionHeadRecipe(), className)}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={triggerId}
        data-open={isOpen}
        onClick={composeEventHandlers(onClick, () => toggle(value))}
        {...props}
      >
        <span className={cx(accordionTitleRecipe())}>{children}</span>
        <span className={cx(accordionIndicatorRecipe())} data-open={isOpen} aria-hidden>
          {indicator ?? (
            <svg className={cx(accordionIconRecipe())} viewBox="0 0 24 24">
              <path d="M6 9l6 6l6-6" />
            </svg>
          )}
        </span>
      </button>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, contentId, triggerId } = useContext(AccordionItemContext);
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState<number>(0);

    useIsomorphicLayoutEffect(() => {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <div
        ref={ref}
        className={cx(accordionContentWrapperRecipe(), className)}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        data-open={isOpen}
        style={{ maxHeight: isOpen ? contentHeight : 0 }}
        {...props}
      >
        <div ref={innerRef} className={cx(accordionContentInnerRecipe())}>
          {children}
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';
