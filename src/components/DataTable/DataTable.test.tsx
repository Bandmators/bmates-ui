import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { DataTable } from '../..';
import { fireEvent, render, screen } from '../../libs/test';

const data = [
  { id: 'docgo', name: 'Docgo', version: '0.1.2' },
  { id: 'bmates', name: 'BMates UI', version: '1.1.1' },
];
const columns = [
  { id: 'name', header: 'Name', accessor: (row: (typeof data)[number]) => row.name, sortable: true },
  { id: 'version', header: 'Version', accessor: (row: (typeof data)[number]) => row.version },
];

it('filters, sorts, and selects data rows', () => {
  render(<DataTable data={data} columns={columns} getRowId={row => row.id} selectable filterable />, {});

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'docgo' } });
  expect(screen.getByText('Docgo')).toBeInTheDocument();
  expect(screen.queryByText('BMates UI')).not.toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('Select all rows'));
  expect(screen.getByLabelText('Select row docgo')).toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: /Name/ }));
  expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute('aria-sort', 'ascending');
});
