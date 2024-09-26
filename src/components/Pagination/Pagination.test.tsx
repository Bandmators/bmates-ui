import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { AutoPagination } from './AutoPagination';
import { Pagination } from './Pagination';
import { PaginationContent } from './PaginationContent';
import { PaginationItem } from './PaginationItem';
import { PaginationLink, PaginationNextLink, PaginationPreviousLink } from './PaginationLink';

describe('AutoPagination', () => {
  it('Should render correct page numbers', () => {
    render(<AutoPagination pageNo={5} pageSize={17} pageGap={5} />);

    expect(screen.getByText('5')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).not.toBeInTheDocument();
    expect(screen.queryByText('11')).not.toBeInTheDocument();
  });

  it('Should disable previous button correctly', () => {
    render(<AutoPagination pageNo={3} pageSize={20} pageGap={5} />);

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('Should disable next button correctly', () => {
    render(<AutoPagination pageNo={5} pageSize={17} pageGap={5} />);

    const prevButton = screen.getByLabelText('Next page');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('Should use custom link component', () => {
    const CustomLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>((props, ref) => (
      <a ref={ref} {...props} data-testid="custom-link" />
    ));

    render(<AutoPagination pageNo={5} pageSize={20} pageGap={5} linkas={CustomLink} />);

    const links = screen.getAllByTestId('custom-link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('Should invoke click events conditionally based on the state', async () => {
    const handleClick = vi.fn();

    render(
      <Pagination>
        <PaginationContent>
          <PaginationPreviousLink disabled onClick={handleClick} />
          {[1, 2, 3].map(page => (
            <PaginationItem key={page}>
              <PaginationLink onClick={handleClick}>{page}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNextLink onClick={handleClick} />
        </PaginationContent>
      </Pagination>,
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(prevButton);

    expect(handleClick).toHaveBeenCalledTimes(0);

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).not.toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(nextButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
