import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  AutoPagination,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPreviousLink,
} from '../../';

const meta = {
  title: 'common/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {},
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Base Pagination',
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Pagination>
          <PaginationContent>
            {[1, 2, 3].map(page => (
              <PaginationItem key={page}>
                <PaginationLink selected={page === 2}>{page}</PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {},
  decorators: [
    () => {
      return (
        <Pagination>
          <PaginationContent>
            <PaginationPreviousLink disabled />
            {[1, 2, 3].map(page => (
              <PaginationItem key={page}>
                <PaginationLink>{page}</PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      );
    },
  ],
};

export const Auto: Story = {
  args: {},
  decorators: [
    () => {
      return <AutoPagination pageNo={5} pageSize={17} pageGap={5} />;
    },
  ],
};
