import styled from '@emotion/styled';
import * as React from 'react';

import { PortalProvider } from '@/components/Portal/PortalProvider';

import ContextMenuContext from './_ContextMenuContext2.ts';

interface ContextMenuProps {
  children: React.ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  const openContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
    setIsOpen(true);
  };

  const closeContextMenu = () => {
    setIsOpen(false);
    setPosition(null);
  };

  React.useEffect(() => {
    const handleClick = () => closeContextMenu();
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <ContextMenuContext.Provider value={{ isOpen, position, openContextMenu, closeContextMenu }}>
      <PortalProvider align={'start'} space={0}>
        {children}
        {isOpen && position && <ContextMenu position={position} />}
      </PortalProvider>
    </ContextMenuContext.Provider>
  );
};

const ContextMenu: React.FC<{ position: { x: number; y: number } }> = ({ position }) => {
  return (
    <MenuContainer style={{ top: position.y, left: position.x }}>
      <MenuItemList>
        <MenuItem>Action 1</MenuItem>
        <MenuItem>Action 2</MenuItem>
        <MenuItem>Action 3</MenuItem>
      </MenuItemList>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 8px 0;
  min-width: 150px;
`;

const MenuItemList = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
`;
const MenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`;
