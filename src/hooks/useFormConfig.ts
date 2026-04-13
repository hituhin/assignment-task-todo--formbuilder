import { useState } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage';
import { LS_FORM_KEY } from '../utils/constants';
import type { FieldConfig } from '../types';

export function useFormConfig() {
  const [savedConfig, setSavedConfig] = useState<FieldConfig[] | null>(
    () => getLocalStorage<FieldConfig[]>(LS_FORM_KEY)
  );

  function saveConfig(fields: FieldConfig[]): void {
    setLocalStorage<FieldConfig[]>(LS_FORM_KEY, fields);
    setSavedConfig(fields);
  }

  function clearConfig(): void {
    removeLocalStorage(LS_FORM_KEY);
    setSavedConfig(null);
  }

  return { savedConfig, saveConfig, clearConfig };
}
