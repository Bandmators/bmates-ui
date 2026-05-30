import { cx } from '@/styles/panda';
import * as React from 'react';

import useControllableState from '@/hooks/useControllableState';
import { composeEventHandlers } from '@/libs/event';

import {
  checkboxBoxRecipe,
  checkboxContainerRecipe,
  checkboxHiddenRecipe,
  checkboxLabelRecipe,
} from './checkbox.recipe';

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {
  /*
    Checkbox checked value
  */
  checked?: boolean;
  /*
    Checkbox Label (Like Description)
  */
  label?: string;
  /*
    Checkbox id value
  */
  id?: string;
  /*
    Checkbox Icon Element
  */
  iconEl?: React.ReactNode;
  /*
    Checkbox align style (css 'algin-items')
  */
  align?: 'start' | 'center' | 'end';
  /*
    [BMates] on change checked event 
  */
  onCheckedChange?(checked: boolean): void;
}

type CheckboxLabelProps = React.ComponentPropsWithoutRef<'span'>;

const CheckboxLabel = ({ className, ...props }: CheckboxLabelProps) => {
  return <span className={cx(checkboxLabelRecipe(), className)} {...props} />;
};

type CheckboxCompoundComponent = React.ForwardRefExoticComponent<
  CheckboxProps & React.RefAttributes<HTMLInputElement>
> & {
  Label: typeof CheckboxLabel;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked = false,
      label,
      id,
      children,
      iconEl,
      align = 'center',
      disabled = false,
      onChange,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const [chk, setChk] = useControllableState<boolean>({
      initValue: checked,
      onChange: onCheckedChange,
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChk(e.target.checked);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.which === 13 || e.key === ' ' || e.which === 32) {
        e.preventDefault();
        setChk(!chk);
      }
    };

    return (
      <label
        className={cx(checkboxContainerRecipe({ align: align || 'center', disabled }), className)}
        data-checked={chk}
        aria-checked={chk}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={chk}
          data-checked={chk}
          aria-checked={chk}
          disabled={disabled}
          onChange={composeEventHandlers(onChange, onChangeHandler)}
          tabIndex={-1}
          className={checkboxHiddenRecipe()}
          {...props}
        />
        <div
          className={cx(checkboxBoxRecipe({ checked: chk, disabled }), undefined)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKeyDownHandler}
        >
          {iconEl ? (
            iconEl
          ) : (
            <svg className="bmates-checkbox-icon" viewBox="0 0 24 24">
              <path d="M5 12l5 5l08 -10"></path>
            </svg>
          )}
        </div>
        {label && <span className={checkboxLabelRecipe()}>{label}</span>}
        {children}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';

const BMatesCheckbox = Object.assign(Checkbox, {
  Label: CheckboxLabel,
}) as CheckboxCompoundComponent;
export { BMatesCheckbox as Checkbox };
