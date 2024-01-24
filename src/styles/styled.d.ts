import 'styled-components';

import { ColorsTypes, DevicesTypes, FontSizeTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSizes: FontSizeTypes;
    breakpoints: DevicesTypes;
  }
}
