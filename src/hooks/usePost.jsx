import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePost는 PostProvider 내부에서 사용해야 합니다.");
  }

  return context;
};
