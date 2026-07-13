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

export const RichItemContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Selected items preserve their ReactNode content instead of being flattened to text.',
      },
    },
  },
  args: {
    align: 'start',
    children: (
      <>
        <SelectToggle style={{ width: '14rem' }}>Select channel</SelectToggle>
        <SelectContent width={'14rem'}>
          <SelectItem value="design">
            <span
              aria-hidden="true"
              style={{
                alignItems: 'center',
                background: '#dbeafe',
                borderRadius: '999px',
                color: '#1d4ed8',
                display: 'inline-flex',
                fontSize: '0.7rem',
                fontWeight: 700,
                height: '1.25rem',
                justifyContent: 'center',
                width: '1.25rem',
              }}
            >
              D
            </span>
            <span>Design</span>
          </SelectItem>
          <SelectItem value="frontend">
            <span
              aria-hidden="true"
              style={{
                alignItems: 'center',
                background: '#dcfce7',
                borderRadius: '999px',
                color: '#15803d',
                display: 'inline-flex',
                fontSize: '0.7rem',
                fontWeight: 700,
                height: '1.25rem',
                justifyContent: 'center',
                width: '1.25rem',
              }}
            >
              F
            </span>
            <span>Frontend</span>
          </SelectItem>
          <SelectItem value="backend">
            <span
              aria-hidden="true"
              style={{
                alignItems: 'center',
                background: '#fee2e2',
                borderRadius: '999px',
                color: '#b91c1c',
                display: 'inline-flex',
                fontSize: '0.7rem',
                fontWeight: 700,
                height: '1.25rem',
                justifyContent: 'center',
                width: '1.25rem',
              }}
            >
              B
            </span>
            <span>Backend</span>
          </SelectItem>
        </SelectContent>
      </>
    ),
  },
};

export const Space: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Select space={16} />`',
      },
    },
  },
  args: {
    align: 'start',
    space: 16,
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

export const HoverOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Select hoverOpen />`',
      },
    },
  },
  args: {
    align: 'center',
    hoverOpen: true,
    children: (
      <>
        <SelectToggle style={{ width: '12rem' }}>Hover me</SelectToggle>
        <SelectContent width={'12rem'}>
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
      </>
    ),
  },
};
