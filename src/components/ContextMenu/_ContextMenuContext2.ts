import { createContext, useContext } from 'react';

interface ContextMenuContextType {
  isOpen: boolean;
  position: { x: number; y: number } | null;
  openContextMenu: (event: React.MouseEvent) => void;
  closeContextMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within a ContextMenuProvider');
  }
  return context;
};

export default ContextMenuContext;
