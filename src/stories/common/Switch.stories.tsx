import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Label, Switch } from '../..';

const meta = {
  title: 'common/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    componentSubtitle: 'Base Switch',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    label: 'Switch',
  },
};

export const WithChildren: Story = {
  args: {
    id: 'switch-with-child',
    label: 'With Children',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'switch-with-text',
  },
  decorators: [
    Story => {
      return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', lineHeight: '1' }}>
          <Story />
          <Label htmlFor="switch-with-text" style={{ marginLeft: '0px' }}>
            With Label
          </Label>
        </div>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    checked: true,
    label: 'Disabled',
    disabled: true,
  },
};
