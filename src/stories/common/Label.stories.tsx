import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Input, InputGroup, Label } from '../../';

const meta = {
  title: 'common/Label',
  component: Label,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Label',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Email',
  },
};

export const WithInput: Story = {
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
  args: {
    htmlFor: 'email',
    children: 'Email',
  },
};
