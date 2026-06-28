export const BMateColors = {
  background: '#FFF',
  white: '#FAFAFA',
  black: '#212121',
  primary: '#212121',
  secondary: '#E0E0E0',
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
  danger: '#dc2626',
  warning: '#d97706',

  // primary (brand neutral)
  'primary-fg': '#ffffff',
  'primary-hover': '#3a3a3a',
  'primary-soft': '#f4f4f5',
  'primary-soft-fg': '#212121',
  'primary-soft-hover': '#e9e9eb',
  'primary-border': '#d4d4d8',
  // secondary (neutral gray)
  'secondary-fg': '#212121',
  'secondary-hover': '#d1d1d6',
  'secondary-soft': '#f4f4f5',
  'secondary-soft-fg': '#424242',
  'secondary-soft-hover': '#e9e9eb',
  'secondary-border': '#d4d4d8',
  // success (green)
  success: '#16a34a',
  'success-fg': '#ffffff',
  'success-hover': '#15803d',
  'success-soft': '#ecfdf3',
  'success-soft-fg': '#15803d',
  'success-soft-hover': '#d1fadf',
  'success-border': '#a6f4c5',
  // danger (red)
  'danger-fg': '#ffffff',
  'danger-hover': '#b91c1c',
  'danger-soft': '#fef2f2',
  'danger-soft-fg': '#b91c1c',
  'danger-soft-hover': '#fee2e2',
  'danger-border': '#fecaca',
  // warning (amber)
  'warning-fg': '#ffffff',
  'warning-hover': '#b45309',
  'warning-soft': '#fffbeb',
  'warning-soft-fg': '#b45309',
  'warning-soft-hover': '#fef3c7',
  'warning-border': '#fde68a',
  // info (blue)
  info: '#2563eb',
  'info-fg': '#ffffff',
  'info-hover': '#1d4ed8',
  'info-soft': '#eff6ff',
  'info-soft-fg': '#1d4ed8',
  'info-soft-hover': '#dbeafe',
  'info-border': '#bfdbfe',

  // Semantic surfaces & text hierarchy.
  surface: '#FFFFFF',
  'surface-hover': '#F4F4F5',
  'surface-active': '#ECECEE',
  elevated: '#FFFFFF',
  border: '#ECECEF',
  'border-strong': '#E0E0E0',
  text: '#212121',
  'text-strong': '#111113',
  muted: '#757575',
  faint: '#9E9E9E',
  overlay: 'rgba(33, 33, 33, 0.45)',

  focus: {
    border: '#212121',
    shadow: '0 0 0 3px rgba(33, 33, 33, 0.14)',
  },
};
export type ColorTypes = typeof BMateColors;

/**
 * Non-color design tokens (radius scale, easing curves, elevation shadows).
 */
export const BMateTokens = {
  'radius-sm': '8px',
  radius: '10px',
  'radius-lg': '14px',
  'radius-full': '9999px',

  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  transition: '0.14s cubic-bezier(0.4, 0, 0.2, 1)',

  'shadow-sm': '0 1px 2px rgba(33, 33, 33, 0.06)',
  shadow: '0 1px 2px rgba(33, 33, 33, 0.04), 0 8px 24px rgba(33, 33, 33, 0.08)',
  'shadow-lg': '0 12px 32px rgba(33, 33, 33, 0.14)',
};
export type TokenTypes = typeof BMateTokens;

/**
 * Dark theme overrides — applied under `html[data-theme='dark']`.
 */
export const BMateColorsDark = {
  background: '#1a1a1a',

  // semantic surfaces & text hierarchy
  surface: '#29292d',
  'surface-hover': '#323237',
  'surface-active': '#3a3a40',
  elevated: '#2c2c31',
  border: '#3a3a40',
  'border-strong': '#4c4c54',
  text: '#ececef',
  'text-strong': '#fbfbfc',
  muted: '#a6a6ae',
  faint: '#76767e',
  overlay: 'rgba(0, 0, 0, 0.6)',

  // gray ramp (inverted so gray-50 is darkest, gray-900 lightest)
  gray: {
    50: '#1e1e20',
    100: '#29292d',
    200: '#323237',
    300: '#3a3a40',
    400: '#55555d',
    500: '#76767e',
    600: '#a6a6ae',
    700: '#d4d4d8',
    800: '#e4e4e7',
    900: '#fafafa',
  },

  // primary (brand neutral inverts to a light fill on dark)
  primary: '#ececef',
  'primary-fg': '#1a1a1a',
  'primary-hover': '#d4d4d8',
  'primary-soft': '#29292d',
  'primary-soft-fg': '#ececef',
  'primary-soft-hover': '#323237',
  'primary-border': '#4c4c54',

  // secondary (neutral gray)
  secondary: '#34343a',
  'secondary-fg': '#ececef',
  'secondary-hover': '#3f3f46',
  'secondary-soft': '#29292d',
  'secondary-soft-fg': '#d4d4d8',
  'secondary-soft-hover': '#323237',
  'secondary-border': '#4c4c54',

  // accent tonal (soft) sets — solid fills & their white foregrounds are kept
  'success-soft': '#14271c',
  'success-soft-fg': '#4ade80',
  'success-soft-hover': '#1c3526',
  'success-border': '#2f5e40',
  'danger-soft': '#2a1416',
  'danger-soft-fg': '#f87171',
  'danger-soft-hover': '#3a1c1f',
  'danger-border': '#5e2f33',
  'warning-soft': '#2a2010',
  'warning-soft-fg': '#fbbf24',
  'warning-soft-hover': '#3a2c14',
  'warning-border': '#5e4a1f',
  'info-soft': '#14203a',
  'info-soft-fg': '#60a5fa',
  'info-soft-hover': '#1c2c4f',
  'info-border': '#2f4a7a',

  focus: {
    border: '#ececef',
    shadow: '0 0 0 3px rgba(236, 236, 239, 0.16)',
  },
};

/** Dark overrides for elevation shadows (deeper on dark surfaces). */
export const BMateTokensDark = {
  'shadow-sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
  shadow: '0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.5)',
  'shadow-lg': '0 12px 32px rgba(0, 0, 0, 0.55)',
};

export const BMateFontSizes = {};
export type FontSizeTypes = typeof BMateFontSizes;

export const BMateBreakpoints = {
  desktopLarge: '1200px',
  desktop: '1024px',
  tablet: '768px',
  mobile: '576px',
};
export type BreakpointTypes = typeof BMateBreakpoints;

const theme = {
  colors: BMateColors,
  tokens: BMateTokens,
  colorsDark: BMateColorsDark,
  tokensDark: BMateTokensDark,
  fontSizes: BMateFontSizes,
  breakpoints: BMateBreakpoints,
} as const;
export default theme;
