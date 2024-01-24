import styled from '@emotion/styled';
import * as React from 'react';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {}

const StyledLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1;
`;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <StyledLabel ref={ref} className={className} {...props} />
));
Label.displayName = 'Label';
