import { useEffect, useState } from 'react';

import { reducer } from './ToastContext';
import { Action, State, ToastData } from './type';

type ToastProps = Omit<ToastData, 'toastId'>;

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach(listener => {
    listener(memoryState);
  });
};

let cnt = 1;
const toast = ({ ...props }: ToastProps) => {
  const toastId = cnt++;
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      toastId,
    },
  });

  return {
    toastId,
  };
};

const removeToast = (toastId: number) => {
  dispatch({ type: 'REMOVE_TOAST', toastId });
};

export const useToast = () => {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    removeToast,
  };
};
