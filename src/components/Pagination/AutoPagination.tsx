import { Pagination } from './Pagination';
import { PaginationContent } from './PaginationContent';
import { PaginationItem } from './PaginationItem';
import { PaginationLink, PaginationNextLink, PaginationPreviousLink } from './PaginationLink';

interface AutoPaginationProps {
  pageNo: number;
  pageSize: number;
  pageGap?: number;

  linkas?: React.ElementType;
}

export const AutoPagination = ({ pageNo, pageSize, pageGap = 10, linkas }: AutoPaginationProps) => {
  const start = Math.floor(pageNo / (pageGap + 1)) * pageGap;
  const end = Math.min(start + pageGap, pageSize);
  const pages = Array.from({ length: end - start }, (_, index) => index + start + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousLink
            disabled={pageNo <= pageGap}
            href={`?page=${start}`}
            to={`?page=${start}`}
            as={linkas}
          />
        </PaginationItem>
        {pages.map(page => (
          <PaginationItem key={`bmates-pagination-${page}`}>
            <PaginationLink active={page === pageNo} href={`?page=${page}`} to={`?page=${page}`} as={linkas}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNextLink
            disabled={end >= pageSize}
            href={`?page=${end + 1}`}
            to={`?page=${end + 1}`}
            as={linkas}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
