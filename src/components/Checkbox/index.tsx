import styled from '@emotion/styled';
import * as React from 'react';

import { composeEventHandlers } from '@/libs/event';

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
  align?: React.CSSProperties['alignItems'];
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, checked = false, label, onChange, id, children, iconEl, align = 'center', disabled = false, ...props },
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
      <CheckboxContainer align={align} disabled={disabled} className={className} data-checked={chk}>
        <HiddenCheckbox
          ref={ref}
          id={id}
          type="checkbox"
          checked={chk}
          data-checked={chk}
          onChange={composeEventHandlers(onChange, onChangeHandler)}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox checked={chk} disabled={disabled}>
          {iconEl ? (
            iconEl
          ) : (
            <Icon viewBox="0 0 24 24">
              <path d="M5 12l5 5l08 -10"></path>
            </Icon>
          )}
        </StyledCheckbox>
        {label && <CheckboxLabel>{label}</CheckboxLabel>}
        {children}
      </CheckboxContainer>
    );
  },
);
Checkbox.displayName = 'Checkbox';

const CheckboxLabel = styled.span`
  font-weight: 500;
  margin-left: 1rem;
`;

const BMatesCheckbox = Checkbox as typeof Checkbox & {
  Label: typeof CheckboxLabel;
};
BMatesCheckbox.Label = CheckboxLabel;
export { BMatesCheckbox as Checkbox };

const CheckboxContainer = styled.label<{ align: React.CSSProperties['alignItems']; disabled: boolean }>`
  display: inline-flex;
  align-items: ${props => props.align};
  line-height: 1;
  ${props => props.disabled && 'opacity: 0.5;'}
`;

const StyledCheckbox = styled.div<{ checked: boolean; disabled: boolean }>`
  display: inline-flex;
  width: 1rem;
  height: 1rem;
  background: ${props => (props.checked ? props.theme.colors.primary : 'transparent')};
  border-radius: 4px;
  transition: all 150ms;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  cursor: pointer;
  ${props => props.disabled && 'cursor: not-allowed;'}
  svg {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input`
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