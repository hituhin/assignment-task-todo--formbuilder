import { useTodoFilterStore } from '../../store/todoFilterStore';
import type { StatusFilter, User } from '../../types';
import styles from './TodoFilters.module.css';

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

interface Props {
  users: User[];
}

export default function TodoFilters({ users }: Props) {
  const { selectedUserId, selectedStatus, setUserFilter, setStatusFilter, resetFilters } =
    useTodoFilterStore();

  const isFiltered = selectedUserId || selectedStatus !== 'all';

  return (
    <div className={styles.card}>
      <div className={styles.row}>

        {/* User filter */}
        <div className={styles.group}>
          <label className={styles.label}>Filter by User</label>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={selectedUserId ?? ''}
              onChange={(e) => setUserFilter(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <span className={styles.selectArrow}>▾</span>
          </div>
        </div>

        {/* Status filter */}
        <div className={styles.statusGroup}>
          <label className={styles.label}>Filter by Status</label>
          <div className={styles.segmented}>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`${styles.segBtn}${selectedStatus === value ? ` ${styles.segBtnActive}` : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {isFiltered && (
          <button onClick={resetFilters} className={styles.clearBtn}>
            ✕ Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
