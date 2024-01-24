import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../../';

const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Button',
    docs: {
      description: {
        component: `Base Button of Everything.`,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    ...Primary.args,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    ...Primary.args,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    ...Primary.args,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    ...Primary.args,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    ...Primary.args,
  },
};

export const Icon: Story = {
  args: {
    ...Ghost.args,
  },
  decorators: [
    Story => {
      return (
        <Story>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </Story>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    ...Primary.args,
  },
};