import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Select, SelectContent, SelectDivider, SelectItem, SelectLabel, SelectToggle } from '../../';

const meta = {
  title: 'common/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    align: 'center',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Select',
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Select>
          <SelectToggle style={{ width: '200px' }}>Select a animal</SelectToggle>
          <SelectContent width={200}>
            <SelectLabel>Animals</SelectLabel>
            <SelectDivider />
            <SelectItem value="cat">Cat</SelectItem>
            <SelectItem value="dog">Dog</SelectItem>
            <SelectItem value="fox">Fox</SelectItem>
            <SelectItem value="nilgai">Nilgai</SelectItem>
            <SelectItem value="nunbird" disabled>
              Numbird
            </SelectItem>
          </SelectContent>
        </Select>
      );
    },
  ],
};

export const MultiSelect: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Select multi />`',
      },
    },
  },
  args: {
    align: 'start',
    multi: true,
    children: (
      <>
        <SelectToggle style={{ width: '12rem' }}>Assignees</SelectToggle>
        <SelectContent width={'12rem'}>
          <SelectItem value="adam">Adam</SelectItem>
          <SelectItem value="Jamij">Jamie</SelectItem>
          <SelectItem value="john">John</SelectItem>
          <SelectItem value="messi">Messi</SelectItem>
        </SelectContent>
      </>
    ),
  },
};
