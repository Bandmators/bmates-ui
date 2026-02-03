import React from 'react';

type UseControllableStateParams<T> = {
  initValue: T;
  onChange?: (state: T) => void;
};

const useControllableState = <T>({
  initValue,
  onChange = () => {},
}: UseControllableStateParams<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValueInternal] = React.useState<T>(initValue);

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    newValue => {
      setValueInternal(newValue); // State update

      if (typeof onChange === 'function') {
        onChange(newValue as T);
      }
    },
    [onChange],
  );

  return [value, setValue];
};

export default useControllableState;
