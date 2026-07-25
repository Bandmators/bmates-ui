import { cx } from '@/styles/classnames';
import * as React from 'react';

import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableColumn<T> = {
  id: string;
  header: React.ReactNode;
  accessor?: (row: T) => string | number | null | undefined;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  selectable?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  emptyMessage?: React.ReactNode;
  defaultSelectedRowIds?: string[];
  selectedRowIds?: string[];
  onSelectedRowIdsChange?: (rowIds: string[]) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  selectable = false,
  filterable = false,
  filterPlaceholder = 'Filter rows...',
  emptyMessage = 'No matching rows.',
  defaultSelectedRowIds = [],
  selectedRowIds,
  onSelectedRowIdsChange,
  className,
}: DataTableProps<T>) {
  const [filter, setFilter] = React.useState('');
  const [sort, setSort] = React.useState<{ columnId: string; direction: DataTableSortDirection } | null>(null);
  const [uncontrolledSelectedIds, setUncontrolledSelectedIds] = React.useState(defaultSelectedRowIds);
  const selectedIds = selectedRowIds ?? uncontrolledSelectedIds;

  const setSelectedIds = (nextIds: string[]) => {
    if (selectedRowIds === undefined) setUncontrolledSelectedIds(nextIds);
    onSelectedRowIdsChange?.(nextIds);
  };

  const visibleRows = React.useMemo(() => {
    const normalizedFilter = filter.trim().toLocaleLowerCase();
    const filtered = normalizedFilter
      ? data.filter(row =>
          columns.some(column =>
            String(column.accessor?.(row) ?? '')
              .toLocaleLowerCase()
              .includes(normalizedFilter),
          ),
        )
      : [...data];

    if (!sort) return filtered;
    const column = columns.find(item => item.id === sort.columnId);
    if (!column?.accessor) return filtered;

    return filtered.sort((left, right) => {
      const leftValue = String(column.accessor?.(left) ?? '');
      const rightValue = String(column.accessor?.(right) ?? '');
      return leftValue.localeCompare(rightValue, undefined, { numeric: true }) * (sort.direction === 'asc' ? 1 : -1);
    });
  }, [columns, data, filter, sort]);

  const visibleIds = visibleRows.map(getRowId);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.includes(id));

  const toggleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable || !column.accessor) return;
    setSort(current =>
      current?.columnId === column.id && current.direction === 'asc'
        ? { columnId: column.id, direction: 'desc' }
        : { columnId: column.id, direction: 'asc' },
    );
  };

  return (
    <div className={cx('bm-data-table', className)}>
      {filterable && (
        <div className="bm-data-table__toolbar">
          <Input
            className="bm-data-table__filter"
            type="search"
            value={filter}
            onChange={event => setFilter(event.target.value)}
            placeholder={filterPlaceholder}
            aria-label={filterPlaceholder}
          />
        </div>
      )}
      <Table hoverable>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="bm-data-table__selection">
                <Checkbox
                  checked={allVisibleSelected}
                  onCheckedChange={() =>
                    setSelectedIds(
                      allVisibleSelected
                        ? selectedIds.filter(id => !visibleIds.includes(id))
                        : [...new Set([...selectedIds, ...visibleIds])],
                    )
                  }
                  aria-label="Select all rows"
                />
              </TableHead>
            )}
            {columns.map(column => {
              const direction = sort?.columnId === column.id ? sort.direction : undefined;
              return (
                <TableHead
                  key={column.id}
                  aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : undefined}
                >
                  <button
                    type="button"
                    className={cx('bm-data-table__sort', column.sortable && 'bm-data-table__sort--enabled')}
                    onClick={() => toggleSort(column)}
                    disabled={!column.sortable}
                  >
                    {column.header}
                    {column.sortable && (
                      <span aria-hidden="true">{direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}</span>
                    )}
                  </button>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.length === 0 ? (
            <TableRow>
              <TableCell className="bm-data-table__empty" colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            visibleRows.map(row => {
              const rowId = getRowId(row);
              const selected = selectedIds.includes(rowId);
              return (
                <TableRow key={rowId} data-selected={selected}>
                  {selectable && (
                    <TableCell className="bm-data-table__selection">
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() =>
                          setSelectedIds(selected ? selectedIds.filter(id => id !== rowId) : [...selectedIds, rowId])
                        }
                        aria-label={`Select row ${rowId}`}
                      />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell key={column.id}>{column.cell ? column.cell(row) : column.accessor?.(row)}</TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
