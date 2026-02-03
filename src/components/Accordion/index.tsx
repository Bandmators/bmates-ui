import styled from '@emotion/styled';
import * as React from 'react';

import useContext from '@/hooks/useContext';
import useControllableState from '@/hooks/useControllableState';
import { composeEventHandlers } from '@/libs/event';

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
      <AccordionRoot ref={ref} className={className} {...props}>
        <AccordionContext.Provider value={{ openItems, type, toggle }}>{children}</AccordionContext.Provider>
      </AccordionRoot>
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
        <AccordionItemContainer ref={ref} className={className} data-open={isOpen} data-disabled={disabled} {...props}>
          {children}
        </AccordionItemContainer>
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
      <AccordionHead
        ref={ref}
        className={className}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={contentId}
        id={triggerId}
        data-open={isOpen}
        onClick={composeEventHandlers(onClick, () => toggle(value))}
        {...props}
      >
        <AccordionTitle>{children}</AccordionTitle>
        <AccordionIndicator data-open={isOpen} aria-hidden>
          {indicator ?? (
            <Icon viewBox="0 0 24 24">
              <path d="M6 9l6 6l6-6" />
            </Icon>
          )}
        </AccordionIndicator>
      </AccordionHead>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, contentId, triggerId } = useContext(AccordionItemContext);
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    const [contentHeight, setContentHeight] = React.useState<number>(0);

    React.useLayoutEffect(() => {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <AccordionContentWrapper
        ref={ref}
        className={className}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        data-open={isOpen}
        style={{ maxHeight: isOpen ? contentHeight : 0 }}
        {...props}
      >
        <AccordionContentInner ref={innerRef}>{children}</AccordionContentInner>
      </AccordionContentWrapper>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';

const AccordionRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionItemContainer = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 0.5rem;
  background-color: var(--background);
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const AccordionHead = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: var(--gray-800);

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-shadow);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &[data-open='true'] {
    border-bottom: 1px solid var(--gray-200);
  }
`;

const AccordionTitle = styled.span`
  flex: 1;
  text-align: left;
`;

const AccordionIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease;

  &[data-open='true'] {
    transform: rotate(180deg);
  }
`;

const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const AccordionContentWrapper = styled.div`
  overflow: hidden;
  transition:
    max-height 200ms ease,
    opacity 200ms ease;
  opacity: 0;

  &[data-open='true'] {
    opacity: 1;
  }
`;

const AccordionContentInner = styled.div`
  padding: 1rem;
  color: var(--gray-600);
  font-size: 0.875rem;
  line-height: 1.5;
`;
