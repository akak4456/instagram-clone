export const withDelay = (callback, ms = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, ms);
  });
};
