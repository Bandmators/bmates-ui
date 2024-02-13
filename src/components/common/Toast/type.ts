import { DefaultVariantType } from '@/types/variant';

import { Toast } from '.';

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export const TOAST_LIMIT = 5;

// export Type

export type ToastData = {
  /*
    Toast unique number
  */
  toastId: number;
  /*
    Toast Title
  */
  title?: React.ReactNode;
  /*
    Toast Description
  */
  description?: React.ReactNode;
  /*
    Toast Variant
  */
  variant?: DefaultVariantType;
  /*
    Toast duration time.
    if time < 0: primitive
  */
  time?: number;

  /*
    Toast Custom Data.
    It just for action callback
  */
  data?: unknown;
  /*
    Toast Click Action.
    Called when Toast is clicked.
  */
  action?: (data: unknown) => void;
};

export interface State {
  toasts: ToastData[];
}

export type Action =
  | { type: 'ADD_TOAST'; toast: ToastData }
  | { type: 'UPDATE_TOAST'; toast: ToastData }
  | { type: 'REMOVE_TOAST'; toastId: number };

export type ToastDispatch = React.Dispatch<Action>;
