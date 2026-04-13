import { useState } from 'react';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage';
import { LS_FORM_KEY } from '../utils/constants';

export function useFormConfig() {
  const [savedConfig, setSavedConfig] = useState(() => getLocalStorage(LS_FORM_KEY));

  function saveConfig(fields) {
    setLocalStorage(LS_FORM_KEY, fields);
    setSavedConfig(fields);
  }

  function clearConfig() {
    removeLocalStorage(LS_FORM_KEY);
    setSavedConfig(null);
  }

  return { savedConfig, saveConfig, clearConfig };
}
