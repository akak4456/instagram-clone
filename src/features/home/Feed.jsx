import { useRef, useEffect, useCallback } from "react";
import { usePost } from "../../hooks/usePost";
import FeedItem from "./FeedItem";
import { useAuth } from "../../hooks/useAuth";

const Feed = () => {
  const { user } = useAuth();
  const { posts, loadPosts, hasMore, resetPosts, postLoading } = usePost();
  const observerRef = useRef(null);

  const userId = user.userId;

  useEffect(() => {
    resetPosts();
    loadPosts(userId);
  }, [userId, loadPosts, resetPosts]);

  const lastPostRef = useCallback(
    (node) => {
      if (postLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !postLoading) {
          loadPosts(userId);
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [hasMore, postLoading, loadPosts, userId],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

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
