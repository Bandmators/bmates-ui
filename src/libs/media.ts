import { BMateBreakpoints } from '@/styles/theme';

const generateMediaQuery = (breakpoint: string, scaling: 'min' | 'max' = 'min') =>
  `@media screen and (${scaling}-width: ${breakpoint})`;

export const minMedia = {
  xs: generateMediaQuery(BMateBreakpoints.xs),
  sm: generateMediaQuery(BMateBreakpoints.sm),
  md: generateMediaQuery(BMateBreakpoints.md),
  lg: generateMediaQuery(BMateBreakpoints.lg),
  xl: generateMediaQuery(BMateBreakpoints.xl),
  '2xl': generateMediaQuery(BMateBreakpoints['2xl']),
  mobile: generateMediaQuery(BMateBreakpoints.mobile),
  tablet: generateMediaQuery(BMateBreakpoints.tablet),
  desktop: generateMediaQuery(BMateBreakpoints.desktop),
  desktopLarge: generateMediaQuery(BMateBreakpoints.desktopLarge),
};

export const maxMedia = {
  xs: generateMediaQuery(BMateBreakpoints.xs, 'max'),
  sm: generateMediaQuery(BMateBreakpoints.sm, 'max'),
  md: generateMediaQuery(BMateBreakpoints.md, 'max'),
  lg: generateMediaQuery(BMateBreakpoints.lg, 'max'),
  xl: generateMediaQuery(BMateBreakpoints.xl, 'max'),
  '2xl': generateMediaQuery(BMateBreakpoints['2xl'], 'max'),
  mobile: generateMediaQuery(BMateBreakpoints.mobile, 'max'),
  tablet: generateMediaQuery(BMateBreakpoints.tablet, 'max'),
  desktop: generateMediaQuery(BMateBreakpoints.desktop, 'max'),
  desktopLarge: generateMediaQuery(BMateBreakpoints.desktopLarge, 'max'),
};
