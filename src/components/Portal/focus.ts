import { PortalFocusItem } from './PortalContext';

export const getEnabledPortalItems = (items: PortalFocusItem[]) => {
  return items
    .filter(item => !item.disabled && item.element.isConnected)
    .sort((left, right) => {
      if (left.element === right.element) return 0;

      return left.element.compareDocumentPosition(right.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
};

export const getNextPortalItem = (
  items: PortalFocusItem[],
  activeElement: HTMLElement | null,
  direction: 'next' | 'prev',
) => {
  const enabledItems = getEnabledPortalItems(items);
  if (!enabledItems.length) return undefined;

  const activeIndex = activeElement ? enabledItems.findIndex(item => item.element === activeElement) : -1;
  if (activeIndex === -1) {
    return direction === 'prev' ? enabledItems[enabledItems.length - 1] : enabledItems[0];
  }

  const offset = direction === 'next' ? 1 : -1;
  const nextIndex = (activeIndex + offset + enabledItems.length) % enabledItems.length;
  return enabledItems[nextIndex];
};
