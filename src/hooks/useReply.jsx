import { useContext } from "react";
import { ReplyContext } from "../contexts/ReplyContext";

export const useReply = () => {
  return useContext(ReplyContext);
};
