import { useTodoFilterStore } from '../../store/todoFilterStore';
import type { StatusFilter, User } from '../../types';

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
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
      <div className="flex flex-wrap items-end gap-5">

        {/* User filter */}
        <div className="flex flex-col gap-2 min-w-[220px]">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Filter by User
          </label>
          <div className="relative">
            <select
              className="w-full h-10 pl-4 pr-9 border border-gray-200 rounded-lg bg-gray-50 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white cursor-pointer transition"
              value={selectedUserId ?? ''}
              onChange={(e) => setUserFilter(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>
        </div>

        {/* Status filter */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Filter by Status
          </label>
          <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`h-8 px-4 rounded-md text-sm font-medium transition-all ${
                  selectedStatus === value
                    ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset — only show when something is active */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1.5 h-10 px-4 rounded-lg text-sm font-medium text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
          >
            ✕ Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
