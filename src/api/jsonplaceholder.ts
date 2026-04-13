import type { Todo, User } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json() as Promise<Todo[]>;
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json() as Promise<User[]>;
}
