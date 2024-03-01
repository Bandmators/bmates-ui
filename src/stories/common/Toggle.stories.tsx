import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import React from 'react';
import { Toggle, Tooltip } from '../..';

const meta = {
  title: 'common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: {
    children: 'Toggle',
  },
  argTypes: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Toggle',
    docs: {
      description: {
        component: `Base Toggle of Everything.`,
      },
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
      </svg>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    ...Default.args,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    ...Default.args,
  },
};

export const WithTooltip: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    Story => {
      return (
        <Tooltip message="bold">
          <Story />
        </Tooltip>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    ...Default.args,
  },
};
