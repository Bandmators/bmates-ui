import { Theme } from '@emotion/react';

export const BMateColors = {
  bg: '#FFF',
  white: '#FAFAFA',
  black: '#212121',
  primary: '#212121',
  secondary: '#EEEEEE',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  danger: '#ef4444',
  warning: '#ffb029',
};
export type ColorTypes = typeof BMateColors;

export const BMateFontSizes = {};
export type FontSizeTypes = typeof BMateFontSizes;

export const BMateBreakpoints = {
  desktopLarge: '1200px',
  desktop: '1024px',
  tablet: '768px',
  mobile: '576px',
};
export type BreakpointTypes = typeof BMateBreakpoints;

const theme: Theme = {
  colors: BMateColors,
  fontSizes: BMateFontSizes,
  breakpoints: BMateBreakpoints,
};
export default theme;
