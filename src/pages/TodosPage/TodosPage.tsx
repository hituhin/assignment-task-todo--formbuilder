import { useMemo, useRef, useState, useEffect } from 'react';
import { useTodos } from '../../hooks/useTodos';
import { useUsers } from '../../hooks/useUsers';
import { useTodoFilterStore } from '../../store/todoFilterStore';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import TodoFilters from '../../components/todos/TodoFilters';
import TodoTable from '../../components/todos/TodoTable';
import Pagination from '../../components/todos/Pagination';

const NAVBAR_HEIGHT = 64; // matches h-16 on Navbar

export default function TodosPage() {
  const { data: todos, isLoading, isError } = useTodos();
  const { data: users = [], usersMap } = useUsers();

  const { selectedUserId, selectedStatus, currentPage, setPage } = useTodoFilterStore();

  // Measure the sticky filter bar height so the table header sticks right below it
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
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl px-8 py-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
        <p className="mt-1 text-indigo-200 text-sm">
          Manage and track all your tasks in one place.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5">
            <span className="text-2xl font-bold">{todos?.length ?? '—'}</span>
            <span className="text-xs text-indigo-100 font-medium leading-tight">Total<br />Todos</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5">
            <span className="text-2xl font-bold text-green-300">{isLoading ? '—' : completedCount}</span>
            <span className="text-xs text-indigo-100 font-medium leading-tight">Completed</span>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5">
            <span className="text-2xl font-bold text-yellow-300">{isLoading ? '—' : pendingCount}</span>
            <span className="text-xs text-indigo-100 font-medium leading-tight">Pending</span>
          </div>
          {(selectedUserId || selectedStatus !== 'all') && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5">
              <span className="text-2xl font-bold">{filteredTodos.length}</span>
              <span className="text-xs text-indigo-100 font-medium leading-tight">Filtered<br />Results</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Filters — sticky wrapper; ref measures height for thead offset ── */}
      <div ref={filterRef} className="sticky top-16 z-40">
        <TodoFilters users={users} />
      </div>

      {/* ── Table ── */}
      <TodoTable
        todos={enrichedTodos}
        isLoading={isLoading}
        isError={isError}
        startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
        theadTop={theadTop}
      />

      {/* ── Pagination ── */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
