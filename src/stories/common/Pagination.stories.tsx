import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { Pagination, PaginationContent, PaginationItem } from '../../';

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
            <PaginationItem>1</PaginationItem>
            <PaginationItem active>2</PaginationItem>
            <PaginationItem>3</PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    },
  ],
};
