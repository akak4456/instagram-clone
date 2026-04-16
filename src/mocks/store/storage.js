export const getStorageData = (key, initialValue) => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [...initialValue];
    return JSON.parse(stored);
  } catch (error) {
    console.error(`${key} 읽기 실패`, error);
    return [...initialValue];
  }
};

export const setStorageData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`${key} 저장 실패`, error);
    return false;
  }
};
