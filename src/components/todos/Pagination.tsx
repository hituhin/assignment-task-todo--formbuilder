import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  function getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.info}>
        Page <span className={styles.infoNum}>{currentPage}</span> of{' '}
        <span className={styles.infoNum}>{totalPages}</span>
      </span>

      <div className={styles.controls}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.btn}
        >
          ← Prev
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`e-${idx}`} className={styles.ellipsis}>…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`${styles.pageBtn}${page === currentPage ? ` ${styles.pageBtnActive}` : ''}`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.btn}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
