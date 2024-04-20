import { Pagination } from './Pagination';
import { PaginationContent } from './PaginationContent';
import { PaginationItem, PaginationNext, PaginationPrevious } from './PaginationItem';

interface AutoPaginationProps {
  pageNo: number;
  pageSize: number;
  pageGap?: number;
}

export const AutoPagination = ({ pageNo, pageSize, pageGap = 10 }: AutoPaginationProps) => {
  const getPages = () => {
    const start = Math.floor(pageNo / (pageGap + 1)) * pageGap;
    const end = Math.min(start + pageGap, pageSize);
    return Array.from({ length: end - start }, (_, index) => index + start + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious />
        {getPages().map(page => (
          <PaginationItem key={`bmates-pagination-${page}`} active={page === pageNo}>
            {page}
          </PaginationItem>
        ))}
        <PaginationNext />
      </PaginationContent>
    </Pagination>
  );
};
