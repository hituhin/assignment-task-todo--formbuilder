// ── API models ─────────────────────────────────────────────
export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type UsersMap = Record<number, string>;

export interface EnrichedTodo extends Todo {
  userName: string;
}

// ── Todo filter state ───────────────────────────────────────
export type StatusFilter = 'all' | 'completed' | 'pending';

// ── Form builder ────────────────────────────────────────────
export type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'checkbox' | 'select';

export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  options: string[];
  required: boolean;
}

export type FormValues = Record<string, string | boolean>;
export type FormErrors = Record<string, string>;
