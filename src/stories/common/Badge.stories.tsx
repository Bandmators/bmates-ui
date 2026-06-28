import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Badge } from '../..';

const VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'outline', 'ghost'] as const;

const meta = {
  title: 'common/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Badge',
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = { args: { children: 'Badge' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Badge' } };
export const Success: Story = { args: { variant: 'success', children: 'Badge' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Badge' } };
export const Warning: Story = { args: { variant: 'warning', children: 'Badge' } };
export const Info: Story = { args: { variant: 'info', children: 'Badge' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Badge' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Badge' } };

/** Every available variant at a glance. */
export const AllVariants: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {VARIANTS.map(variant => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
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
