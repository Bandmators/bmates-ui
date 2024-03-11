import React from 'react';

import { Action, State, TOAST_LIMIT, ToastDispatch } from './type';

export const ToastStateContext = React.createContext<State | null>(null);
export const ToastDispatchContext = React.createContext<ToastDispatch | null>(null);

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.toast].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map(t => (t.toastId === action.toast.toastId ? { ...t, ...action.toast } : t)),
      };

    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter(t => t.toastId !== action.toastId),
      };
  }
};

/**
 * Toast Context Provider
 * @returns
 */
export const ToasterProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  );
};
