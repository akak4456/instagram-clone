import { PostProvider } from "./PostContext";
import { ReplyProvider } from "./ReplyContext";

export const FeedProvider = ({ children }) => {
  return (
    <PostProvider>
      <ReplyProvider>{children}</ReplyProvider>
    </PostProvider>
  );
};
