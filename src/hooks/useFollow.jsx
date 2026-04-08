import { useContext } from "react";
import { FollowContext } from "../contexts/FollowContext";

export const useFollow = () => {
  return useContext(FollowContext);
};
