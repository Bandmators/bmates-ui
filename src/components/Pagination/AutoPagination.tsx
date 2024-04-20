import React from 'react';

import { Pagination } from './Pagination';
import { PaginationContent } from './PaginationContent';
import { PaginationItem } from './PaginationItem';
import { PaginationLink, PaginationNext, PaginationPrevious } from './PaginationLink';

interface AutoPaginationProps {
  pageNo: number;
  pageSize: number;
  pageGap?: number;
}

export const AutoPagination = ({ pageNo, pageSize, pageGap = 10 }: AutoPaginationProps) => {
  const start = Math.floor(pageNo / (pageGap + 1)) * pageGap;
  const end = Math.min(start + pageGap, pageSize);
  const pages = Array.from({ length: end - start }, (_, index) => index + start + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={pageNo <= pageGap} href={`?page=${start}`} />
        </PaginationItem>
        {pages.map(page => (
          <PaginationItem key={`bmates-pagination-${page}`}>
            <PaginationLink active={page === pageNo} href={`?page=${page}`}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext disabled={end >= pageSize} href={`?page=${end + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
