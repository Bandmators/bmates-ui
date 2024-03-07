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

/*
  Exclude Touch Event (Mobile, Tablet env)
*/
type ExcludeTouchFunction<E> = (event: React.PointerEvent<E>) => void;
export const excludeTouchEventHandler: <E>(eventHandler: () => void) => ExcludeTouchFunction<E> = eventHandler => {
  return event => {
    if (event.pointerType !== 'touch') {
      eventHandler();
    }
  };
};
