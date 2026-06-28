import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button } from '../../';

const VARIANTS = [
  'default',
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'outline',
  'ghost',
] as const;

const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'icon'] },
  },
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

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Success: Story = { args: { variant: 'success' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Warning: Story = { args: { variant: 'warning' } };
export const Info: Story = { args: { variant: 'info' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };

/** Every available variant at a glance. */
export const AllVariants: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {VARIANTS.map(variant => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
