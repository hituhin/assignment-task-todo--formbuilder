import { create } from 'zustand';
import type { FieldConfig, FieldType } from '../types';

interface FormBuilderState {
  fields: FieldConfig[];
  addField: () => void;
  removeField: (id: string) => void;
  updateField: (id: string, changes: Partial<Omit<FieldConfig, 'id'>>) => void;
  moveFieldUp: (id: string) => void;
  moveFieldDown: (id: string) => void;
  setFields: (fields: FieldConfig[]) => void;
}

const createField = (): FieldConfig => ({
  id: crypto.randomUUID(),
  label: '',
  type: 'text' as FieldType,
  options: [],
  required: false,
});

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  fields: [],
  addField: () =>
    set((state) => ({ fields: [...state.fields, createField()] })),
  removeField: (id) =>
    set((state) => ({ fields: state.fields.filter((f) => f.id !== id) })),
  updateField: (id, changes) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...changes } : f)),
    })),
  moveFieldUp: (id) =>
    set((state) => {
      const idx = state.fields.findIndex((f) => f.id === id);
      if (idx <= 0) return state;
      const fields = [...state.fields];
      [fields[idx - 1], fields[idx]] = [fields[idx], fields[idx - 1]];
      return { fields };
    }),
  moveFieldDown: (id) =>
    set((state) => {
      const idx = state.fields.findIndex((f) => f.id === id);
      if (idx === -1 || idx === state.fields.length - 1) return state;
      const fields = [...state.fields];
      [fields[idx], fields[idx + 1]] = [fields[idx + 1], fields[idx]];
      return { fields };
    }),
  setFields: (fields) => set({ fields }),
}));
