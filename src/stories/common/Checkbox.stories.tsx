import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Card, Checkbox, Label } from '../..';

const meta = {
  title: 'common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    iconEl: {
      description: 'Customize Check Icon',
      table: {
        category: 'Customize',
        subcategory: 'Icon',
        defaultValue: {
          summary: 'svg',
          detail: '<svg viewBox="0 0 24 24" class="css-nm934x"><path d="M5 12l5 5l08 -10"></path></svg>',
        },
        type: { summary: 'React.ReactNode', detail: 'SVG Element' },
      },
      control: {
        type: 'select',
        options: [5, 10, 15, 20, 30, 40, 60, 80, 100],
      },
    },
  },
  parameters: {
    componentSubtitle: 'Base Checkbox',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  args: {},
};

export const Multiple: Story = {
  args: {},
  decorators: [
    Story => {
      return (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Story />
          <Story />
          <Story />
        </div>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled',
  },
};

export const WithLabelProps: Story = {
  args: {
    label: 'Label',
    id: 'with-label',
  },
};

export const WithLabelChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'It is same that use label props.\nUnless there are special cases, use label props.',
      },
    },
  },
  args: {
    children: <Checkbox.Label>Use Checkbox.Label</Checkbox.Label>,
  },
};

export const WithText: Story = {
  args: {
    id: 'checkbox-with-text',
  },
  decorators: [
    Story => {
      return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', lineHeight: '1' }}>
          <Story />
          <div>
            <Label htmlFor="checkbox-with-text" style={{ marginLeft: '0px' }}>
              Accept terms and conditions
            </Label>
            <p style={{ margin: '4px 0px', color: 'gray', fontSize: '0.875rem' }}>
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      );
    },
  ],
};

export const WithChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'If you use children, then it has checkbox event',
      },
    },
  },
  args: {
    children: <Card style={{ marginLeft: '1rem' }}>Click me</Card>,
  },
};

export const NoneChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'If you dont want to have a checkbox event, dont use children.',
      },
    },
  },
  args: {},
  decorators: [
    Story => {
      return (
        <div style={{ display: 'flex' }}>
          <Story />
          <Card style={{ marginLeft: '1rem' }}>Click me (Nothing changed)</Card>
        </div>
      );
    },
  ],
};

export const ChangeIcon: Story = {
  args: {
    iconEl: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={'2px'}>
        <path d="M 5 12 l 5 5 m 10 -5 a 8 8 0 1 0 -16 0 a 8 8 0 1 0 16 0 Z"></path>
      </svg>
    ),
    label: `Use 'iconEl' like this.`,
  },
};
