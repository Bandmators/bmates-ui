import type { Meta, StoryObj } from '@storybook/react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../..';

const meta = {
  title: 'common/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof Table>;

function Example({ size = 'md', hoverable = false }: { size?: 'sm' | 'md' | 'lg'; hoverable?: boolean }) {
  return (
    <Table size={size} hoverable={hoverable}>
      <TableHeader>
        <TableRow>
          <TableHead>Package</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>docgo</TableCell>
          <TableCell>0.1.2</TableCell>
          <TableCell>Ready</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>bmates-ui</TableCell>
          <TableCell>1.1.1</TableCell>
          <TableCell>Ready</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export const Default: Story = { render: () => <Example /> };
export const Hoverable: Story = { render: () => <Example hoverable /> };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Example size="sm" />
      <Example size="md" />
      <Example size="lg" />
    </div>
  ),
};
