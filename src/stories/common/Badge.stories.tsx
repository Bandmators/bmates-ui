import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Badge } from '../..';

const meta = {
  title: 'common/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: 'Badge',
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

export const WithLink: Story = {
  args: {
    children: 'Link',
  },
  decorators: [
    Story => {
      return (
        <a href="#with-link">
          <Story />
        </a>
      );
    },
  ],
};

export const WithText: Story = {
  args: {
    children: 'Badge',
  },
  decorators: [
    Story => {
      return (
        <div>
          <Story /> <span>WithText</span>
        </div>
      );
    },
  ],
};
