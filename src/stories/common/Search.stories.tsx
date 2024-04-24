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

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Search>
          <SearchInputToggle placeholder="Search Input /" />
          <SearchContent width={600} style={{}}>
            <SearchItemList>
              <SearchLabel>Social</SearchLabel>
              <SearchItem>GitHub</SearchItem>
              <SearchItem>Facebook</SearchItem>
              <SearchDivider />
              <SearchLabel>User</SearchLabel>
              <SearchItem>@bandmators</SearchItem>
              <SearchItem>@bmates</SearchItem>
            </SearchItemList>
          </SearchContent>
        </Search>
      );
    },
  ],
};

export const Toggle: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Search>
          <SearchToggle>
            Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
          </SearchToggle>
          <SearchContent width={600} style={{}}>
            <SearchInput />
            <SearchItemList>
              <SearchLabel>Social</SearchLabel>
              <SearchItem>GitHub</SearchItem>
              <SearchItem>Facebook</SearchItem>
              <SearchDivider />
              <SearchLabel>User</SearchLabel>
              <SearchItem>@bandmators</SearchItem>
              <SearchItem>@bmates</SearchItem>
            </SearchItemList>
          </SearchContent>
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
    children: (
      <>
        <SearchToggle>
          Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
        </SearchToggle>
        <SearchContent width={600} style={{}}>
          <SearchInput />
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
          </SearchItemList>
        </SearchContent>
      </>
    ),
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
    children: (
      <>
        <SearchToggle>
          Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
        </SearchToggle>
        <SearchContent width={600} style={{}}>
          <SearchInput />
          <SearchItemList>
            <SearchLabel>Social</SearchLabel>
            <SearchItem>
              GitHub
              <SearchShortcut>⌘+T</SearchShortcut>
            </SearchItem>
            <SearchItem disabled>Facebook</SearchItem>
            <SearchDivider />
            <SearchLabel>User</SearchLabel>
            <SearchItem>@bandmators</SearchItem>
            <SearchItem>@bmates</SearchItem>
          </SearchItemList>
        </SearchContent>
      </>
    ),
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
    children: (
      <>
        <SearchToggle>
          Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
        </SearchToggle>
        <SearchContent width={600} style={{}}>
          <SearchInput />
          <SearchItemList>
            <SearchLabel>Social</SearchLabel>
            <SearchItem>
              GitHub
              <SearchShortcut>⌘+T</SearchShortcut>
            </SearchItem>
            <SearchItem disabled>Facebook</SearchItem>
            <SearchDivider />
            <SearchLabel>User</SearchLabel>
            <SearchItem>@bandmators</SearchItem>
            <SearchItem>@bmates</SearchItem>
          </SearchItemList>
        </SearchContent>
      </>
    ),
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
    children: (
      <>
        <SearchToggle>
          Search Input <kbd style={{ marginLeft: '1rem' }}>/</kbd>
        </SearchToggle>
        <SearchContent width={600} style={{}}>
          <SearchInput />
          <SearchItemList>
            <SearchLabel>Social</SearchLabel>
            <SearchItem>
              GitHub
              <SearchShortcut>⌘+T</SearchShortcut>
            </SearchItem>
            <SearchItem disabled>Facebook</SearchItem>
            <SearchDivider />
            <SearchLabel>User</SearchLabel>
            <SearchItem>@bandmators</SearchItem>
            <SearchItem>@bmates</SearchItem>
          </SearchItemList>
        </SearchContent>
      </>
    ),
  },
};
