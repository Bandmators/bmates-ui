import { useCallback, useContext, useEffect, useState } from 'react';

import { ToastDispatchContext, ToastStateContext, reducer } from './ToastContext';
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
  const scopedState = useContext(ToastStateContext);
  const scopedDispatch = useContext(ToastDispatchContext);
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    if (scopedState && scopedDispatch) return;

    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [scopedDispatch, scopedState]);

  const scopedToast = useCallback(
    ({ ...props }: ToastProps) => {
      if (!scopedDispatch) return toast(props);

      const toastId = cnt++;
      scopedDispatch({
        type: 'ADD_TOAST',
        toast: {
          ...props,
          toastId,
        },
      });

      return {
        toastId,
      };
    },
    [scopedDispatch],
  );

  const scopedRemoveToast = useCallback(
    (toastId: number) => {
      if (!scopedDispatch) {
        removeToast(toastId);
        return;
      }

      scopedDispatch({ type: 'REMOVE_TOAST', toastId });
    },
    [scopedDispatch],
  );

  if (scopedState && scopedDispatch) {
    return {
      ...scopedState,
      toast: scopedToast,
      removeToast: scopedRemoveToast,
    };
  }

  return {
    ...state,
    toast,
    removeToast,
  };
};
