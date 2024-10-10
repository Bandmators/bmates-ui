import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { SpecialVariantType } from '@/types/variant';

export interface InputFileProps extends React.ComponentPropsWithoutRef<'input'> {
  /*
      Input File variant
    */
  variant?: InputFileVariantType;
  label?: string;
}

type InputFileVariantType = SpecialVariantType | 'default';

const InputFileVariantStyles = ({ variant }: { variant: InputFileVariantType }) => {
  switch (variant) {
    case 'secondary':
      return css`
        border: 1px solid var(--secondary);
        background-color: var(--secondary);
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'danger':
      return css`
        color: var(--white);
        border: 1px solid var(--danger);
        background-color: var(--danger);
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'warning':
      return css`
        color: var(--white);
        border: 1px solid var(--warning);
        background-color: var(--warning);
        &:hover {
          opacity: 0.8;
        }
      `;
    case 'outline':
      return css`
        border: 1px solid var(--gray-300);
        background-color: transparent;
        &:hover {
          background-color: var(--gray-100);
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
      `;
    case 'primary':
      return css`
        color: white;
        border: 1px solid var(--primary);
        background-color: var(--primary);
        &:hover {
          opacity: 0.8;
        }
      `;
    default:
      return css`
        color: var(--black);
        background-color: var(--background);
        border: 1px solid var(--gray-300);
        &:hover {
          opacity: 0.8;
        }
      `;
  }
};
const StyledInputFile = styled.input`
  display: none;
`;

const FileUploadInputFile = styled.label<{ variant?: InputFileVariantType; disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;

  ${({ variant }) => variant && InputFileVariantStyles({ variant })}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const InputFileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, variant = 'default', disabled = false, children, ...props }, ref) => {
    return (
      <InputFileContainer>
        {label && <span>{label}</span>}
        <StyledInputFile type="file" ref={ref} {...props} />
        <FileUploadInputFile htmlFor={props.id} disabled={disabled} variant={variant}>
          {children ?? 'File Input'}
        </FileUploadInputFile>
      </InputFileContainer>
    );
  },
);

InputFile.displayName = 'InputFile';
export default InputFile;
