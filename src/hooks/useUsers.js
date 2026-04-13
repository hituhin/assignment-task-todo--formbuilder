import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/jsonplaceholder';

export function useUsers() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  const usersMap = query.data
    ? query.data.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {})
    : {};

  return { ...query, usersMap };
}
