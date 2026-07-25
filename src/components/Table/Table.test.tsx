import '@testing-library/jest-dom';
import React from 'react';
import { expect, it } from 'vitest';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../..';
import { render, screen } from '../../libs/test';

it('renders semantic table sections with size and hover classes', () => {
  render(
    <Table size="sm" hoverable>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Docgo</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
    {},
  );

  expect(screen.getByRole('table')).toHaveClass('bm-table--size-sm', 'bm-table--hoverable');
  expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('bm-table__head');
  expect(screen.getByRole('cell', { name: 'Docgo' })).toHaveClass('bm-table__cell');
});
