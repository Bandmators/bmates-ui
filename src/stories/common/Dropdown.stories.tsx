import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  Dropdown,
  DropdownContent,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownShortcut,
  DropdownToggle,
} from '../../';

const meta = {
  title: 'common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    align: 'center',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Dropdown',
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Dropdown>
          <DropdownToggle>Dropdown</DropdownToggle>
          <DropdownContent width={200}>
            <DropdownLabel>Share Social</DropdownLabel>
            <DropdownItem>GitHub</DropdownItem>
          </DropdownContent>
        </Dropdown>
      );
    },
  ],
};

export const AlignStart: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Dropdown align="start" />`',
      },
    },
  },
  args: {
    align: 'start',
    children: (
      <>
        <DropdownToggle>Dropdown</DropdownToggle>
        <DropdownContent width={'15rem'}>
          <DropdownLabel>Share Social</DropdownLabel>
          <DropdownDivider />
          <DropdownItem>
            GitHub
            <DropdownShortcut>⌘+T</DropdownShortcut>
          </DropdownItem>

          <DropdownItem disabled>Facebook</DropdownItem>
          <DropdownItem>Twitter</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const AlignCenter: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Dropdown align="center" />`',
      },
    },
  },
  args: {
    align: 'center',
    children: (
      <>
        <DropdownToggle>Dropdown</DropdownToggle>
        <DropdownContent width={'15rem'}>
          <DropdownLabel>Share Social</DropdownLabel>
          <DropdownDivider />
          <DropdownItem>
            GitHub
            <DropdownShortcut>⌘+T</DropdownShortcut>
          </DropdownItem>

          <DropdownItem disabled>Facebook</DropdownItem>
          <DropdownItem>Twitter</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Dropdown align="end" />`',
      },
    },
  },
  args: {
    align: 'end',
    children: (
      <>
        <DropdownToggle>Dropdown</DropdownToggle>
        <DropdownContent width={'15rem'}>
          <DropdownLabel>Share Social</DropdownLabel>
          <DropdownDivider />
          <DropdownItem>
            GitHub
            <DropdownShortcut>⌘+T</DropdownShortcut>
          </DropdownItem>
          <DropdownItem disabled>Facebook</DropdownItem>
          <DropdownItem>Twitter</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};
