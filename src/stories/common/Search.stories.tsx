import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  Search,
  SearchContent,
  SearchDivider,
  SearchInput,
  SearchInputToggle,
  SearchItem,
  SearchItemList,
  SearchLabel,
  SearchShortcut,
  SearchToggle,
} from '../..';

const meta = {
  title: 'common/Search',
  component: Search,
  tags: ['autodocs'],
  args: {
    align: 'center',
  },
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Search',
  },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof Search>;

const animals = [
  'dog',
  'cat',
  'elephant',
  'lion',
  'tiger',
  'bear',
  'giraffe',
  'zebra',
  'monkey',
  'snake',
  'rabbit',
  'horse',
  'deer',
  'fox',
  'wolf',
];

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      const [text, setText] = React.useState<string>('');
      return (
        <Search>
          <SearchInputToggle
            placeholder="Search Input /"
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <SearchContent width={600} style={{}}>
            <SearchItemList>
              <SearchLabel>Social</SearchLabel>
              <SearchItem>GitHub</SearchItem>
              <SearchItem>Facebook</SearchItem>
              <SearchDivider />
              <SearchLabel>User</SearchLabel>
              {animals
                .filter(animal => animal.includes(text))
                .slice(0, 5)
                .map(item => (
                  <SearchItem key={item}>{item}</SearchItem>
                ))}
            </SearchItemList>
          </SearchContent>
        </Search>
      );
    },
  ],
};

const TempSearch = () => {
  const [text, setText] = React.useState<string>('');

  return (
    <>
      <SearchToggle>
        Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
      </SearchToggle>
      <SearchContent width={600} style={{}}>
        <SearchInput
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <SearchItemList>
          <SearchLabel>Social</SearchLabel>
          <SearchItem>
            GitHub
            <SearchShortcut>⌘+T</SearchShortcut>
          </SearchItem>
          <SearchItem>Facebook</SearchItem>
          <SearchDivider />
          <SearchLabel>User</SearchLabel>
          <SearchItem>@bandmators</SearchItem>
          <SearchItem>@bmates</SearchItem>
          {animals
            .filter(animal => animal.includes(text))
            .slice(0, 5)
            .map(item => (
              <SearchItem key={item}>{item}</SearchItem>
            ))}
        </SearchItemList>
      </SearchContent>
    </>
  );
};

export const Toggle: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Search>
          <TempSearch />
        </Search>
      );
    },
  ],
};

export const Space: Story = {
  parameters: {
    docs: {
      description: {
        story: 'space is `number` type. `<Search space="16" />`',
      },
    },
  },
  args: {
    align: 'start',
    space: 16,
    children: <TempSearch />,
  },
};

export const AlignStart: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Search align="start" />`',
      },
    },
  },
  args: {
    align: 'start',
    children: <TempSearch />,
  },
};

export const AlignCenter: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Search align="center" />`',
      },
    },
  },
  args: {
    align: 'center',
    children: <TempSearch />,
  },
};

export const AlignEnd: Story = {
  parameters: {
    docs: {
      description: {
        story: '`<Search align="end" />`',
      },
    },
  },
  args: {
    align: 'end',
    children: <TempSearch />,
  },
};
