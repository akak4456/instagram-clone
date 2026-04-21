import { useState, useRef, useEffect, useCallback } from "react";
import { usePost } from "../../hooks/usePost";
import { useAuth } from "../../hooks/useAuth";
import {
  FindGrid,
  FindGridItem,
  FindGridImage,
  FindSkeletonItem,
} from "../../styles/features/find.styles";
import ReplyModal from "../reply/ReplyModal";
import useScrollLock from "../../hooks/useScrollLock";

const SKELETON_COUNT = 10;

const FindContainer = () => {
  const { user } = useAuth();
  const { posts, loadPosts, hasMore, postLoading, resetPosts } = usePost();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const observerRef = useRef(null);

  const userId = user?.userId;

  useEffect(() => {
    if (!userId) return;

    const init = async () => {
      setIsInitialLoading(true);
      resetPosts();
      await loadPosts(userId);
      setIsInitialLoading(false);
    };

    init();
  }, [userId, loadPosts, resetPosts]);

  useScrollLock(!!selectedPost);

  const lastPostRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      if (postLoading || !hasMore) return;

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !postLoading) {
          loadPosts(userId);
        }
      });

      observerRef.current.observe(node);
    },
    [hasMore, postLoading, loadPosts, userId],
  );

  if (isInitialLoading) {
    return (
      <FindGrid>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <FindSkeletonItem key={index} />
        ))}
      </FindGrid>
    );
  }

  return (
    <FindGrid>
      {posts.map((post, idx) => {
        const isLast = idx === posts.length - 1;

        if (isLast) {
          return (
            <div ref={lastPostRef} key={post.id}>
              <FindGridItem onClick={() => setSelectedPost(post)}>
                <FindGridImage src={post.images?.[0]} alt={`post-${post.id}`} />
              </FindGridItem>
            </div>
          );
        }

        return (
          <FindGridItem key={post.id} onClick={() => setSelectedPost(post)}>
            <FindGridImage src={post.images?.[0]} alt={`post-${post.id}`} />
          </FindGridItem>
        );
      })}

      {postLoading &&
        posts.length > 0 &&
        Array.from({ length: 5 }).map((_, index) => (
          <FindSkeletonItem key={`loading-${index}`} />
        ))}

      {selectedPost && (
        <ReplyModal
          open={selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </FindGrid>
  );
};

export default FindContainer;
