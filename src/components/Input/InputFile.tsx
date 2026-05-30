import { cx } from '@/styles/panda';
import * as React from 'react';

import { SpecialVariantType } from '@/types/variant';

import { inputFileContainerRecipe, inputFileHiddenRecipe, inputFileLabelRecipe } from './inputFile.recipe';

export interface InputFileProps extends React.ComponentPropsWithoutRef<'input'> {
  /*
      Input File variant
    */
  variant?: InputFileVariantType;
  label?: string;
}

type InputFileVariantType = SpecialVariantType | 'default';

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, variant = 'default', disabled = false, children, id, className, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    return (
      <div className={cx(inputFileContainerRecipe(), className)}>
        {label && <span>{label}</span>}
        <input id={inputId} className={inputFileHiddenRecipe()} type="file" ref={ref} disabled={disabled} {...props} />
        <label htmlFor={inputId} className={cx(inputFileLabelRecipe({ variant, disabled }))}>
          {children ?? 'File Input'}
        </label>
      </div>
    );
  },
);

InputFile.displayName = 'InputFile';
export default InputFile;
