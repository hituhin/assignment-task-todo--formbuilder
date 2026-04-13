import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StatusFilter } from '../types';

interface TodoFilterState {
  selectedUserId: number | null;
  selectedStatus: StatusFilter;
  currentPage: number;
  setUserFilter: (userId: number | null) => void;
  setStatusFilter: (status: StatusFilter) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useTodoFilterStore = create<TodoFilterState>()(
  persist(
    (set) => ({
      selectedUserId: null,
      selectedStatus: 'all',
      currentPage: 1,
      setUserFilter: (userId) => set({ selectedUserId: userId, currentPage: 1 }),
      setStatusFilter: (status) => set({ selectedStatus: status, currentPage: 1 }),
      setPage: (page) => set({ currentPage: page }),
      resetFilters: () => set({ selectedUserId: null, selectedStatus: 'all', currentPage: 1 }),
    }),
    { name: 'todo-filters' }
  )
);
