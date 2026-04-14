import type { EnrichedTodo } from '../../types';
import styles from './TodoRow.module.css';

interface Props {
  todo: EnrichedTodo;
  index: number;
}

export default function TodoRow({ todo, index }: Props) {
  const title = todo.title.charAt(0).toUpperCase() + todo.title.slice(1);

  return (
    <tr className={styles.row}>
      <td className={styles.cellNum}>
        {String(index + 1).padStart(2, '0')}
      </td>
      <td className={styles.cellTitle}>{title}</td>
      <td className={styles.cellStatus}>
        {todo.completed ? (
          <span className={styles.badgeCompleted}>
            <span className={`${styles.dot} ${styles.dotCompleted}`} />
            Completed
          </span>
        ) : (
          <span className={styles.badgePending}>
            <span className={`${styles.dot} ${styles.dotPending}`} />
            Pending
          </span>
        )}
      </td>
      <td className={styles.cellUser}>
        <div className={styles.userCell}>
          <div className={styles.avatar}>
            {todo.userName?.charAt(0).toUpperCase()}
          </div>
          <span className={styles.userName}>{todo.userName}</span>
        </div>
      </td>
    </tr>
  );
}
