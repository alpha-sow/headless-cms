function setItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

function getItem(key: string): string | null {
  return localStorage.getItem(key);
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

export { setItem, getItem, removeItem };
