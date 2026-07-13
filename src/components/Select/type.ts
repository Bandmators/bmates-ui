import type * as React from 'react';

export type SelectType = {
  label: React.ReactNode;
  textValue: string;
  value: string | number | readonly string[];
};
