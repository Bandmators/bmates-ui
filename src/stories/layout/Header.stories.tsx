import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/layout/Header';

const meta = {
  title: 'layout/Header',
  component: Header,
  tags: ['autodocs'],
  args: {},
  parameters: {
    componentSubtitle: 'Base Header',
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
