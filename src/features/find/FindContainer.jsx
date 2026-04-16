import { useState, useRef } from "react";
import { usePost } from "../../hooks/usePost";
import {
  FindGrid,
  FindGridItem,
  FindGridImage,
} from "../../styles/features/find.styles";
import ReplyModal from "../reply/ReplyModal";
import useScrollLock from "../../hooks/useScrollLock";

const FindContainer = () => {
  const { posts, loadPosts, hasMore } = usePost();
  const [selectedPost, setSelectedPost] = useState(null);
  const observerRef = useRef();

  useScrollLock(!!selectedPost);

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
    <FindGrid>
      {posts.map((post, idx) => {
        if (idx === posts.length - 1) {
          return (
            <div ref={lastPostRef} key={post.id}>
              <FindGridItem key={post.id} onClick={() => setSelectedPost(post)}>
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
