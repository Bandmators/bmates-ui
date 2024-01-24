import { BMateBreakpoints } from '@/styles/theme';

const generateMediaQuery = (breakpoint: string, scaling: 'min' | 'max' = 'min') =>
  `@media screen and (${scaling}-width: ${breakpoint})`;

export const minMedia = {
  mobile: generateMediaQuery(BMateBreakpoints.mobile),
  tablet: generateMediaQuery(BMateBreakpoints.tablet),
  desktop: generateMediaQuery(BMateBreakpoints.desktop),
  desktopLarge: generateMediaQuery(BMateBreakpoints.desktopLarge),
};

export const maxMedia = {
  mobile: generateMediaQuery(BMateBreakpoints.mobile, 'max'),
  tablet: generateMediaQuery(BMateBreakpoints.tablet, 'max'),
  desktop: generateMediaQuery(BMateBreakpoints.desktop, 'max'),
  desktopLarge: generateMediaQuery(BMateBreakpoints.desktopLarge, 'max'),
};
