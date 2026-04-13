import type { EnrichedTodo } from '../../types';

interface Props {
  todo: EnrichedTodo;
  index: number;
}

export default function TodoRow({ todo, index }: Props) {
  const title = todo.title.charAt(0).toUpperCase() + todo.title.slice(1);

  return (
    <tr className="group hover:bg-indigo-50/50 transition-colors">
      {/* # */}
      <td className="pl-5 pr-2 py-4 text-xs text-gray-300 font-mono w-10 select-none">
        {String(index + 1).padStart(2, '0')}
      </td>
      {/* Title */}
      <td className="px-3 py-4 text-sm text-gray-700 leading-snug">
        {title}
      </td>
      {/* Status */}
      <td className="px-3 py-4">
        {todo.completed ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Completed
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        )}
      </td>
      {/* Assigned to */}
      <td className="px-3 py-4 pr-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {todo.userName?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-500">{todo.userName}</span>
        </div>
      </td>
    </tr>
  );
}
