import { useRef } from "react";
import { usePost } from "../../hooks/usePost";
import FeedItem from "./FeedItem";

const Feed = () => {
  const { posts, loadPosts, hasMore } = usePost();
  const observerRef = useRef();

  const lastPostRef = (node) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadPosts(); // 🔥 다음 페이지 로드
      }
    });

    if (node) observerRef.current.observe(node);
  };

  return (
    <>
      {posts.map((post, idx) => {
        if (idx === posts.length - 1) {
          return (
            <div ref={lastPostRef} key={post.id}>
              <FeedItem post={post} />
            </div>
          );
        }
        return <FeedItem key={post.id} post={post} />;
      })}
    </>
  );
};
export default Feed;
