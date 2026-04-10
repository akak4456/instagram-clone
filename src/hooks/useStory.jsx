import { useContext } from "react";
import { StoryContext } from "../contexts/StoryContext";

export const useStory = () => {
  return useContext(StoryContext);
};
