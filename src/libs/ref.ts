type RefType<T> = React.Ref<T> | undefined;

export const composeRefs = <T>(...refs: RefType<T>[]) => {
  return (node: T) =>
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    });
};
