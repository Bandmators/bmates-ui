import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button, Input, InputGroup, Tooltip } from '../../';

const meta = {
  title: 'common/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    message: 'tooltip',
    direction: 'top',
  },
  parameters: {
    componentSubtitle: 'Base Tooltip',
  },
  decorators: [
    Story => {
      return (
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: <Button variant="outline">Tooltip</Button>,
  },
};

export const WithInput: Story = {
  args: {
    direction: 'bottom',
    children: <Button variant="outline">Tooltip</Button>,
  },
  decorators: [
    Story => {
      return (
        <InputGroup>
          <Story />
          <Input id="email" placeholder="Email" />
        </InputGroup>
      );
    },
  ],
};
