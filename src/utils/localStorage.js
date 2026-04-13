export function getLocalStorage(key) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — fail silently
  }
}

export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // fail silently
  }
}
