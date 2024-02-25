import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Button, Toaster, useToast } from '../..';
import { ToastData } from '../../components/common/Toast/type';

const ToastForStory = ({ ...props }: ToastData) => {
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast({ ...props });
        }}
      >
        Toast
      </Button>
    </>
  );
};

const meta = {
  title: 'common/Toast',
  tags: [],
  args: {},
  component: ToastForStory,
  decorators: [
    Story => {
      return (
        <>
          <Story />
          <Toaster position="bottom-right" />
        </>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Toast',
  },
} satisfies Meta<typeof ToastForStory>;
export default meta;

type Story = StoryObj<typeof ToastForStory>;

export const Default: Story = {
  args: {
    title: 'Toast Title',
    description: `When you click Toast, containing 'data' 'action' is executed.`,
    variant: 'primary',
    time: 5000,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};

export const Primary: Story = {
  args: {
    title: 'Primary Toast',
    description: `Variant Toast`,
    variant: 'primary',
    time: 5000,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Toast',
    description: `Secondary Toast`,
    variant: 'secondary',
    time: 1000,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning Toast',
    description: `Warning Toast`,
    variant: 'warning',
    time: 1000,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};

export const Danger: Story = {
  args: {
    title: 'Danger Toast',
    description: `Danger Toast`,
    variant: 'danger',
    time: 1000,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};

export const NoneTime: Story = {
  args: {
    title: 'Persist Toast',
    description: `If you don't use time props the toast will persist.`,
    data: 'Hi',
    action: d => {
      console.log(d);
    },
  },
};
