import { usePost } from "../../hooks/usePost";
import FeedItem from "./FeedItem";

const Feed = () => {
  const { posts } = usePost();
  return (
    <>
      {posts.map((post) => (
        <FeedItem post={post} />
      ))}
    </>
  );
};

export default Feed;
