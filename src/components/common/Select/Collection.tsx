// import Slot from "@/components/Slot";
// import React from "react";
// import { RefObject } from "react";

// type ContextValue = {
//   itemMap: Map<RefObject<ItemElement>, { ref: React.RefObject<ItemElement> } & ItemData>;
// };

// const Collection = React.createContext<SelectContextType | null>(null);

// export function CollectionProvider() {
//   const itemMap = React.useRef<ContextValue['itemMap']>(new Map()).current;

//   return <Collection.Provider value={{ itemMap }}>{children}</Collection.Provider>;
// }

// const ITEM_DATA_ATTR = 'data-radix-collection-item';

// export function CollectionItem(props) {
//   const context = useCollectionContext();

//   useEffect(() => {
//     context.itemMap.set(ref, { ref, value: props.value });
//   }, []);

//   return (
//     <Slot {...{ [ITEM_DATA_ATTR]: '' }} ref={ref}>
//       {children}
//     </Slot>
//   );
// }

// export function useCollection() {
//   const context = useCollectionContext();

//   const getItems = React.useCallback(() => {
//     const collectionNode = context.collectionRef.current;
//     const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));

//     return orderedItems;
//   }, []);

//   return getItems;
// }
