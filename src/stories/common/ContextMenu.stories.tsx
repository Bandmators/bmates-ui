import React from 'react';

import { ContextMenuProvider, useContextMenu } from '../..';

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
    </ContextMenuProvider>
  );
};

const InnerComponent = () => {
  const { openContextMenu } = useContextMenu();

  return (
    <div
      style={{ height: '300px', border: '1px solid #ccc', position: 'relative', textAlign: 'center' }}
      onContextMenu={openContextMenu}
    >
      Right click here!
    </div>
  );
};

export const Default = Template.bind({});
