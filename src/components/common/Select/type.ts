import { ReactNode } from 'react';

export type SelectAlignType = 'start' | 'center' | 'end';

export type SelectType = {
  name: ReactNode;
  value: string | number | readonly string[];
};
