export const sortByCreatedAtDesc = (items) => {
  return [...items].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
};
