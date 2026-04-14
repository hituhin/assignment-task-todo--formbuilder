import { useMemo, useRef, useState, useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { useUsers } from '../../hooks/useUsers';
import { useTodoFilterStore } from '../../store/todoFilterStore';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import TodoFilters from '../../components/todos/TodoFilters';
import TodoTable from '../../components/todos/TodoTable';
import Pagination from '../../components/todos/Pagination';
import styles from './TodosPage.module.css';

const NAVBAR_HEIGHT = 64;

export default function TodosPage() {
  const { data: todos, isLoading, isError } = useTodos();
  const { data: users = [], usersMap } = useUsers();

  const { selectedUserId, selectedStatus, currentPage, setPage } = useTodoFilterStore();

  const filterRef = useRef<HTMLDivElement>(null);
  const [theadTop, setTheadTop] = useState<number>(172);

  useEffect(() => {
    const el = filterRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setTheadTop(NAVBAR_HEIGHT + el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    return todos.filter((t) => {
      const matchUser = selectedUserId ? t.userId === selectedUserId : true;
      const matchStatus =
        selectedStatus === 'all'
          ? true
          : selectedStatus === 'completed'
          ? t.completed === true
          : t.completed === false;
      return matchUser && matchStatus;
    });
  }, [todos, selectedUserId, selectedStatus]);

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

  const enrichedTodos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTodos
      .slice(start, start + ITEMS_PER_PAGE)
      .map((t) => ({ ...t, userName: usersMap[t.userId] ?? `User ${t.userId}` }));
  }, [filteredTodos, currentPage, usersMap]);

  const completedCount = todos ? todos.filter((t) => t.completed).length : 0;
  const pendingCount = todos ? todos.filter((t) => !t.completed).length : 0;

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Todo List</h1>
        <p className={styles.headerSub}>Manage and track all your tasks in one place.</p>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{todos?.length ?? '—'}</span>
            <span className={styles.statLabel}>Total<br />Todos</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNum} ${styles.statNumGreen}`}>
              {isLoading ? '—' : completedCount}
            </span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNum} ${styles.statNumYellow}`}>
              {isLoading ? '—' : pendingCount}
            </span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          {(selectedUserId || selectedStatus !== 'all') && (
            <div className={styles.statCard}>
              <span className={styles.statNum}>{filteredTodos.length}</span>
              <span className={styles.statLabel}>Filtered<br />Results</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters — sticky wrapper */}
      <div ref={filterRef} className={styles.filterWrapper}>
        <TodoFilters users={users} />
      </div>

      {/* Table */}
      <TodoTable
        todos={enrichedTodos}
        isLoading={isLoading}
        isError={isError}
        startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
        theadTop={theadTop}
      />

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
