import TodoRow from './TodoRow';
import type { EnrichedTodo } from '../../types';
import styles from './TodoTable.module.css';

interface Props {
  todos: EnrichedTodo[];
  isLoading: boolean;
  isError: boolean;
  startIndex?: number;
  theadTop?: number;
}

function SkeletonRows() {
  return Array.from({ length: 8 }, (_, i) => (
    <tr key={i} className={styles.skRow}>
      <td><div className={`${styles.skBlock} ${styles.skBlockNarrow}`} /></td>
      <td><div className={styles.skBlock} style={{ width: `${55 + (i % 4) * 10}%` }} /></td>
      <td><div className={styles.skBadge} /></td>
      <td>
        <div className={styles.skUser}>
          <div className={styles.skAvatar} />
          <div className={styles.skName} />
        </div>
      </td>
    </tr>
  ));
}

export default function TodoTable({ todos, isLoading, isError, startIndex = 0, theadTop = 172 }: Props) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ top: theadTop }} className={`${styles.th} ${styles.thFirst}`}>#</th>
            <th style={{ top: theadTop }} className={styles.th}>Title</th>
            <th style={{ top: theadTop }} className={styles.th}>Status</th>
            <th style={{ top: theadTop }} className={`${styles.th} ${styles.thLast}`}>Assigned To</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {isLoading ? (
            <SkeletonRows />
          ) : isError ? (
            <tr>
              <td colSpan={4} className={styles.errorCell}>
                <div className={styles.bigIcon}>⚠️</div>
                Failed to load todos. Please check your connection.
              </td>
            </tr>
          ) : todos.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                <div className={styles.bigIcon}>🔍</div>
                No todos match the current filters.
              </td>
            </tr>
          ) : (
            todos.map((todo, idx) => <TodoRow key={todo.id} todo={todo} index={startIndex + idx} />)
          )}
        </tbody>
      </table>
    </div>
  );
}
