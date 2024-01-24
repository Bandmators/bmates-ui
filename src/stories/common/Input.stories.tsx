import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Input, InputGroup, Label } from '../../';

const meta = {
  title: 'common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'E-mail',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Input',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { type: 'email' },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  decorators: [
    Story => {
      return (
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Story />
        </InputGroup>
      );
    },
  ],
  args: {
    id: 'email',
    placeholder: 'Email',
  },
};
