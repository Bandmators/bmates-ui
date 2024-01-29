import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';
import { SpecialSizeType } from '@/types/size';
import { VariantType } from '@/types/variant';

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
  align?: React.CSSProperties['alignItems'];
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      checked = false,
      variant = 'primary',
      size = 'md',
      align = 'center',
      disabled = false,
      onChange,
      id,
      children,
      ...props
    },
    ref,
  ) => {
    const [chk, setChk] = React.useState<boolean>(checked);

    React.useEffect(() => {
      setChk(checked);
    }, [checked]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChk(e.target.checked);
    };

    return (
      <SwitchContainer align={align} disabled={disabled} className={className}>
        <HiddenSwitch
          ref={ref}
          id={id}
          type="checkbox"
          checked={chk}
          onChange={composeEventHandlers(onChange, onChangeHandler)}
          disabled={disabled}
          {...props}
        />
        <StyledSwitch variant={variant} checked={chk} size={size} disabled={disabled} />
        {label && <SwitchLabel>{label}</SwitchLabel>}
        {children}
      </SwitchContainer>
    );
  },
);
Switch.displayName = 'Switch';

const SwitchContainer = styled.label<{ align: React.CSSProperties['alignItems']; disabled: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: ${props => props.align};
  line-height: 1;
  ${props => props.disabled && 'opacity: 0.5;'}
`;

const HiddenSwitch = styled.input`
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0px;
  border: none;
  position: absolute;
  white-space: nowrap;
`;

const SwitchLabel = styled.span`
  font-weight: 500;
  margin-left: 1rem;
`;

const SwitchVariantStyles = ({ theme, variant, checked }: { theme: Theme; variant: VariantType; checked: boolean }) => {
  if (!checked) return;

  switch (variant) {
    case 'secondary':
      return css`
        background-color: ${theme.colors.secondary};
      `;
    case 'danger':
      return css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.danger};
      `;
    case 'warning':
      return css`
        color: ${theme.colors.white};
        background-color: ${theme.colors.warning};
      `;
    case 'primary':
    default:
      return css`
        color: white;
        background-color: ${theme.colors.primary};
      `;
  }
};

const SwitchSizeStyles = ({ size, checked }: { size: SpecialSizeType; checked: boolean }) => {
  switch (size) {
    case 'sm':
      return css`
        width: 2rem;
        height: 1rem;
        &:after {
          top: 0.1rem;
          left: 0.1rem;
          width: 0.8rem;
          height: 0.8rem;
          ${checked && `left: calc(100% - 0.1rem);`}
        }
      `;
    case 'lg':
      return css`
        width: 4rem;
        height: 2rem;
        &:after {
          top: 0.2rem;
          left: 0.2rem;
          width: 1.6rem;
          height: 1.6rem;
          ${checked && `left: calc(100% - 0.2rem);`}
        }
      `;
    case 'xl':
      return css`
        width: 6rem;
        height: 3rem;
        &:after {
          top: 0.3rem;
          left: 0.3rem;
          width: 2.4rem;
          height: 2.4rem;
          ${checked && `left: calc(100% - 0.4rem);`}
        }
      `;
    case 'md':
    default:
      return css`
        width: 3rem;
        height: 1.5rem;
        &:after {
          top: 0.15rem;
          left: 0.15rem;
          width: 1.2rem;
          height: 1.2rem;
          ${checked && `left: calc(100% - 0.15rem);`}
        }
      `;
  }
};

const StyledSwitch = styled.div<SwitchProps>`
  position: relative;
  display: inline-block;
  border-radius: 50rem;
  background-color: ${({ theme }) => theme.colors.gray['200']};
  transition: background-color ease 0.2s;
  cursor: pointer;
  text-indent: -9999px;

  &:after {
    content: '';
    position: absolute;
    background: #fff;
    border-radius: 50rem;
    transition: 0.2s;
  }

  ${props =>
    props.checked &&
    css`
      &:after {
        transform: translateX(-100%);
      }
    `}

  ${({ theme, variant, checked = false }) => variant && SwitchVariantStyles({ theme, variant, checked })}
  ${({ size, checked = false }) => size && SwitchSizeStyles({ size, checked })}
  ${props => props.disabled && 'cursor: not-allowed;'}
`;
