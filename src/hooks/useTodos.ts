import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/jsonplaceholder';
import type { Todo } from '../types';

export function useTodos() {
  return useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 5 * 60 * 1000,
  });
}
