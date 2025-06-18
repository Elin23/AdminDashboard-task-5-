import './PaginationComponent.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (pageNumber: number) => void;
}

export default function PaginationComponent({currentPage, totalPages, goToNextPage, goToPrevPage, goToPage}: PaginationProps) {
  const addPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    const showLeftDots = currentPage > 3;
    const showRightDots = currentPage < totalPages - 2;

    pages.push(1);

    if (showLeftDots && !showRightDots) {
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages - 1; i++) {
        pages.push(i);
      }
    } else if (!showLeftDots && showRightDots) {
      for (let i = 2; i <= 3; i++) {
        pages.push(i);
      }
      pages.push('...');
    } else if (showLeftDots && showRightDots) {
      pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
    }

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = addPageNumbers();

  return (
    <div className="Pagination w-100 d-flex justify-content-center">
      <div className={`circle d-flex align-items-center justify-content-center fw-semibold ${currentPage === 1 ? 'disabled' : ''} border border-1 rounded-circle`}
        onClick={currentPage !== 1 ? goToPrevPage : undefined}>
        <img src="/AdminDashboard-task-5-/assets/icons/prev.svg" alt="prev" />
      </div>

      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <div key={index} className={`circle d-flex align-items-center justify-content-center fw-semibold rounded-circle  ${page === currentPage ? 'bg-primary-color text-light' : ''} border border-1`}
            onClick={() => goToPage(page)}>
            <span>{page}</span>
          </div>
        ) : (
          <div key={index} className="circle d-flex align-items-center justify-content-center fw-semibold dots border border-1 rounded-circle">
            <span>{page}</span>
          </div>
        )
      )}

      <div
        className={`circle d-flex align-items-center justify-content-center fw-semibold rounded-circle ${currentPage === totalPages ? 'disabled' : ''} border border-1`}
        onClick={currentPage !== totalPages ? goToNextPage : undefined}>
        <img src="/AdminDashboard-task-5-/assets/icons/next.svg" alt="next" />
      </div>
    </div>
  );
}
