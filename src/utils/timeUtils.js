export const getTimeDiff = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  console.log(created);

  const diff = Math.floor((now - created) / 1000); // 초 단위

  if (diff < 60) return `${diff}초`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일`;

  return `${Math.floor(diff / 604800)}주`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일`;
};
