import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '../../';

const meta = {
  title: 'common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: '/src/assets/bandmate_60.png',
    alt: 'bandmate',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Avatar',
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {},
};

export const Error: Story = {
  args: {
    src: ' ',
    alt: 'bandmate2',
  },
};
