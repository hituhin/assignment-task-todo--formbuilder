import TodoRow from './TodoRow';
import type { EnrichedTodo } from '../../types';

interface Props {
  todos: EnrichedTodo[];
  isLoading: boolean;
  isError: boolean;
  startIndex?: number;
  theadTop?: number;
}

function SkeletonRows() {
  return Array.from({ length: 8 }, (_, i) => (
    <tr key={i} className="border-b border-gray-100">
      <td className="pl-5 pr-2 py-4 w-10">
        <div className="h-3 w-6 rounded bg-gray-100 animate-pulse" />
      </td>
      <td className="px-3 py-4">
        <div className="h-3.5 rounded bg-gray-100 animate-pulse" style={{ width: `${55 + (i % 4) * 10}%` }} />
      </td>
      <td className="px-3 py-4">
        <div className="h-6 w-24 rounded-full bg-gray-100 animate-pulse" />
      </td>
      <td className="px-3 py-4 pr-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />
          <div className="h-3 w-28 rounded bg-gray-100 animate-pulse" />
        </div>
      </td>
    </tr>
  ));
}

export default function TodoTable({ todos, isLoading, isError, startIndex = 0, theadTop = 172 }: Props) {
  return (
    // overflow-hidden removed — it breaks position:sticky on th elements
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {[
              { label: '#',           cls: 'pl-5 pr-2 w-10 rounded-tl-2xl' },
              { label: 'Title',       cls: 'px-3' },
              { label: 'Status',      cls: 'px-3' },
              { label: 'Assigned To', cls: 'px-3 pr-5 rounded-tr-2xl' },
            ].map(({ label, cls }) => (
              <th
                key={label}
                style={{ top: theadTop }}
                className={`sticky z-30 bg-gray-50 shadow-[0_1px_0_0_#e5e7eb]
                            py-3.5 text-left text-xs font-semibold text-gray-400
                            uppercase tracking-widest ${cls}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {isLoading ? (
            <SkeletonRows />
          ) : isError ? (
            <tr>
              <td colSpan={4} className="py-16 text-center text-red-400 text-sm">
                <div className="text-3xl mb-2">⚠️</div>
                Failed to load todos. Please check your connection.
              </td>
            </tr>
          ) : todos.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-16 text-center text-gray-400 text-sm">
                <div className="text-3xl mb-2">🔍</div>
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
