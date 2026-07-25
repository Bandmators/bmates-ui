import { cx } from '@/styles/classnames';
import * as React from 'react';

import { SizeType } from '@/types/size';

export interface TableProps extends React.ComponentPropsWithoutRef<'table'> {
  size?: SizeType;
  hoverable?: boolean;
  wrapperClassName?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, wrapperClassName, size = 'md', hoverable = false, ...props }, ref) => (
    <div className={cx('bm-table-wrapper', wrapperClassName)}>
      <table
        ref={ref}
        className={cx('bm-table', `bm-table--size-${size}`, hoverable && 'bm-table--hoverable', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = ({ className, ...props }: React.ComponentPropsWithoutRef<'thead'>) => (
  <thead className={cx('bm-table__header', className)} {...props} />
);
export const TableBody = ({ className, ...props }: React.ComponentPropsWithoutRef<'tbody'>) => (
  <tbody className={cx('bm-table__body', className)} {...props} />
);
export const TableRow = ({ className, ...props }: React.ComponentPropsWithoutRef<'tr'>) => (
  <tr className={cx('bm-table__row', className)} {...props} />
);
export const TableHead = ({ className, ...props }: React.ComponentPropsWithoutRef<'th'>) => (
  <th className={cx('bm-table__head', className)} {...props} />
);
export const TableCell = ({ className, ...props }: React.ComponentPropsWithoutRef<'td'>) => (
  <td className={cx('bm-table__cell', className)} {...props} />
);
