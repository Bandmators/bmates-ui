import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { DataTable, DataTableColumn } from '../..';

type PackageRow = { id: string; name: string; version: string; status: string };
const data: PackageRow[] = [
  { id: 'docgo', name: 'Docgo', version: '0.1.2', status: 'Ready' },
  { id: 'bmates', name: 'BMates UI', version: '1.1.1', status: 'Ready' },
  { id: 'vite', name: 'Vite', version: '8.0.14', status: 'Update available' },
];
const columns: DataTableColumn<PackageRow>[] = [
  { id: 'name', header: 'Package', accessor: row => row.name, sortable: true },
  { id: 'version', header: 'Version', accessor: row => row.version, sortable: true },
  { id: 'status', header: 'Status', accessor: row => row.status },
];

const meta = {
  title: 'common/DataTable',
  component: DataTable<PackageRow>,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable<PackageRow>>;
export default meta;
type Story = StoryObj<typeof DataTable<PackageRow>>;

function ControlledSelectionTable() {
  const [selectedRowIds, setSelectedRowIds] = React.useState(['docgo']);

  return (
    <DataTable
      data={data}
      columns={columns}
      getRowId={row => row.id}
      selectable
      selectedRowIds={selectedRowIds}
      onSelectedRowIdsChange={setSelectedRowIds}
    />
  );
}

export const Interactive: Story = {
  render: () => <DataTable data={data} columns={columns} getRowId={row => row.id} selectable filterable />,
};
export const ControlledSelection: Story = {
  render: () => <ControlledSelectionTable />,
};
