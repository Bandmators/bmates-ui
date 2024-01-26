export const composeEventHandlers = <E>(
  elementEventHandler?: (event: E) => void,
  bmatesEventHandler?: (event: E) => void,
) => {
  return (event: E) => {
    elementEventHandler?.(event);

    if (!(event as unknown as Event).defaultPrevented) {
      return bmatesEventHandler?.(event);
    }
  };
};
