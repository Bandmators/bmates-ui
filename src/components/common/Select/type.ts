import { ReactNode } from 'react';

export type SelectType = {
  name: ReactNode;
  value: string | number | readonly string[];
};
