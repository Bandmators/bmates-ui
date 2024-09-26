import React from 'react';

import { ContextMenu, ContextMenuItem, ContextMenuProvider } from '../..';

export default {
  title: 'common/ContextMenu',
  component: ContextMenuProvider,
  tags: ['autodocs'],
  args: {},
};

const Template = () => {
  return (
    <ContextMenuProvider>
      <InnerComponent />
      <ContextMenu>
        <ContextMenuItem>GitHub</ContextMenuItem>
        <ContextMenuItem>Facebook</ContextMenuItem>
      </ContextMenu>
    </ContextMenuProvider>
  );
};

const InnerComponent = () => {
  return (
    <div
      style={{
        height: '1000px',
        border: '1px solid #ccc',
        background: 'var(--gray-100)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Right click here!
    </div>
  );
};

export const Default = Template.bind({});
