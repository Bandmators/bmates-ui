export const BMatePrimaryLightScale = {
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
} as const;

export const BMatePrimaryDarkScale = {
  50: '#1E1E20',
  100: '#29292D',
  200: '#323237',
  300: '#3A3A40',
  400: '#55555D',
  500: '#76767E',
  600: '#A6A6AE',
  700: '#D4D4D8',
  800: '#E4E4E7',
  900: '#FAFAFA',
} as const;

export const BMateColors = {
  background: '#FFF',
  white: '#FAFAFA',
  black: '#212121',
  primary: '#212121',
  secondary: '#F1F3F5',
  primaryScale: BMatePrimaryLightScale,
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
  warning: '#f59e0b',
  successScale: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  dangerScale: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warningScale: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  infoScale: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

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
  success: '#22c55e',
  'success-fg': '#FFFFFF',
  'success-hover': '#16a34a',
  'success-soft': '#f0fdf4',
  'success-soft-fg': '#16a34a',
  'success-soft-hover': '#dcfce7',
  'success-border': '#dcfce7',
  // danger (red)
  'danger-fg': '#FFFFFF',
  'danger-hover': '#dc2626',
  'danger-soft': '#fef2f2',
  'danger-soft-fg': '#dc2626',
  'danger-soft-hover': '#fee2e2',
  'danger-border': '#fee2e2',
  // warning (amber)
  'warning-fg': '#FFFFFF',
  'warning-hover': '#d97706',
  'warning-soft': '#fffbeb',
  'warning-soft-fg': '#d97706',
  'warning-soft-hover': '#fef3c7',
  'warning-border': '#fef3c7',
  // info (blue)
  info: '#3b82f6',
  'info-fg': '#FFFFFF',
  'info-hover': '#2563eb',
  'info-soft': '#eff6ff',
  'info-soft-fg': '#2563eb',
  'info-soft-hover': '#dbeafe',
  'info-border': '#dbeafe',

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

export const BMateColorScales = {
  primary: BMateColors.primaryScale,
  primaryLight: BMatePrimaryLightScale,
  primaryDark: BMatePrimaryDarkScale,
  success: BMateColors.successScale,
  danger: BMateColors.dangerScale,
  warning: BMateColors.warningScale,
  info: BMateColors.infoScale,
  gray: BMateColors.gray,
} as const;
export type ColorScaleTypes = typeof BMateColorScales;

/**
 * Non-color design tokens (radius scale, easing curves, elevation shadows).
 */
export const BMateTokens = {
  // Shared interactive control heights (DR-2.1). Every control that can sit on
  // the same row resolves to one of these, so a Button, Input and Select in a
  // row form one unbroken band.
  'control-h-sm': '2rem',
  'control-h-md': '2.5rem',
  'control-h-lg': '3rem',

  'radius-xs': '4px',
  'radius-sm': '8px',
  radius: '10px',
  'radius-lg': '14px',
  'radius-full': '9999px',

  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  transition: '0.14s cubic-bezier(0.4, 0, 0.2, 1)',
  'transition-slow': '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  'transition-bounce': '0.25s cubic-bezier(0.75, -0.5, 0.25, 1.25)',

  'shadow-sm': '0 1px 2px rgba(33, 33, 33, 0.06)',
  shadow: '0 1px 2px rgba(33, 33, 33, 0.04), 0 8px 24px rgba(33, 33, 33, 0.08)',
  'shadow-lg': '0 12px 32px rgba(33, 33, 33, 0.14)',
};
export type TokenTypes = typeof BMateTokens;

export const BMateSpacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;
export type SpacingTypes = typeof BMateSpacing;

export const BMateTypography = {
  'font-sans': "'Barlow', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  'font-mono': "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  'font-size-xs': '0.75rem',
  'font-size-sm': '0.875rem',
  'font-size-md': '1rem',
  'font-size-lg': '1.125rem',
  'font-size-xl': '1.25rem',
  'font-size-2xl': '1.5rem',
  'font-size-3xl': '1.875rem',
  'font-size-4xl': '2.25rem',
  'line-height-tight': '1.2',
  'line-height-normal': '1.5',
  'line-height-relaxed': '1.7',
} as const;
export type TypographyTypes = typeof BMateTypography;

export const BMateContainers = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
} as const;
export type ContainerTypes = typeof BMateContainers;

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

export const BMateFontSizes = {
  xs: BMateTypography['font-size-xs'],
  sm: BMateTypography['font-size-sm'],
  md: BMateTypography['font-size-md'],
  lg: BMateTypography['font-size-lg'],
  xl: BMateTypography['font-size-xl'],
  '2xl': BMateTypography['font-size-2xl'],
  '3xl': BMateTypography['font-size-3xl'],
  '4xl': BMateTypography['font-size-4xl'],
} as const;
export type FontSizeTypes = typeof BMateFontSizes;

export const BMateBreakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  '2xl': '1440px',
  // Legacy aliases retained for existing consumers.
  desktopLarge: '1200px',
  desktop: '1024px',
  tablet: '768px',
  mobile: '576px',
} as const;
export type BreakpointTypes = typeof BMateBreakpoints;

const theme = {
  colors: BMateColors,
  colorScales: BMateColorScales,
  tokens: BMateTokens,
  spacing: BMateSpacing,
  typography: BMateTypography,
  containers: BMateContainers,
  colorsDark: BMateColorsDark,
  tokensDark: BMateTokensDark,
  fontSizes: BMateFontSizes,
  breakpoints: BMateBreakpoints,
} as const;
export default theme;
