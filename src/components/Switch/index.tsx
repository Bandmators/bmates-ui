import { cx } from '@/styles/classnames';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';
import { SpecialSizeType } from '@/types/size';
import { VariantType } from '@/types/variant';

import { switchBoxRecipe, switchContainerRecipe, switchHiddenRecipe, switchLabelRecipe } from './switch.recipe';

interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> {
  /*
      Switch checked value
  */
  checked?: boolean;
  /*
    Switch Label (Like Description)
  */
  label?: string;
  /*
        Switch variant
  */
  variant?: VariantType;
  /*
        Switch size
  */
  size?: SpecialSizeType;
  /*
    Switch align style (css 'algin-items')
  */
  align?: 'start' | 'center' | 'end';
  /*
    [BMates] on change checked event 
  */
  onCheckedChange?(checked: boolean): void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      id,
      className,
      label,
      checked,
      defaultChecked = false,
      variant = 'primary',
      size = 'md',
      align = 'center',
      disabled = false,
      onChange,
      onCheckedChange = () => {},
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const chk = checked ?? uncontrolledChecked;

    React.useEffect(() => {
      if (checked === undefined) setUncontrolledChecked(defaultChecked);
    }, [checked, defaultChecked]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) setUncontrolledChecked(e.target.checked);
      onCheckedChange(e.target.checked);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.which === 13 || e.key === ' ' || e.which === 32) {
        e.preventDefault();
        const nextChecked = !chk;
        if (checked === undefined) setUncontrolledChecked(nextChecked);
        onCheckedChange(nextChecked);
      }
    };

    return (
      <label className={cx(switchContainerRecipe({ align, disabled }), className)} data-checked={chk}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          checked={chk}
          data-checked={chk}
          aria-checked={chk}
          onChange={composeEventHandlers(onChange, onChangeHandler)}
          tabIndex={-1}
          className={switchHiddenRecipe()}
          {...props}
        />
        <div
          className={cx(switchBoxRecipe({ checked: chk, disabled, variant, size }))}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKeyDownHandler}
        />
        {label && <span className={switchLabelRecipe()}>{label}</span>}
        {children}
      </label>
    );
  },
);
Switch.displayName = 'Switch';
