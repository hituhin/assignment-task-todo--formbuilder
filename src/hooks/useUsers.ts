import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/jsonplaceholder';
import type { User, UsersMap } from '../types';

export function useUsers() {
  const query = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  const usersMap: UsersMap = query.data
    ? query.data.reduce<UsersMap>((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {})
    : {};

  return { ...query, usersMap };
}
