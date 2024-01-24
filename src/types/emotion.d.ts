import { BreakpointsType, ColorsType, FontSizesType } from '@/styles/theme';
import '@emotion/react';

type ColorsType = typeof colors;
type FontSizesType = typeof fontSizes;
type BreakpointsType = typeof breakpoints;

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType;
    fontSizes: FontSizesType;
    breakpoints: BreakpointsType;
  }
}
