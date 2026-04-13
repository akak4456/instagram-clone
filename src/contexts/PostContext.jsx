import { createContext, useEffect, useState, useRef } from "react";
import {
  fetchFeed,
  toggleLikeApi,
  toggleBookmarkApi,
  addPostApi,
} from "../mocks/api";
import { useAuth } from "../hooks/useAuth";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 🔥 page를 useRef로 관리
  // 이유:
  // 1. useState는 비동기적으로 업데이트되기 때문에 setPage 후 즉시 값을 사용할 수 없음
  // 2. useRef는 current 값이 동기적으로 즉시 변경되어 pagination 로직에 적합함
  // 3. page 값은 UI에 직접 사용되지 않으므로 리렌더링이 필요하지 않음
  const pageRef = useRef(1);

  const loadPosts = async () => {
    // 🔥 현재 페이지를 즉시 참조 가능
    const currentPage = pageRef.current;

    if (!hasMore || postLoading || !user) return;

    setPostLoading(true);

    const data = await fetchFeed(user.userId, currentPage, 10);

    setPosts((prev) =>
      currentPage === 1 ? data.posts : [...prev, ...data.posts],
    );
    setHasMore(data.hasMore);

    // 🔥 다음 페이지로 증가 (즉시 반영됨)
    pageRef.current += 1;

    setPostLoading(false);
  };

  const toggleLike = async (postId, userId) => {
    await toggleLikeApi({ postId, userId });

    // 🔥 UI 즉시 반영 (optimistic update)
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const isLiked = post.likes.some((l) => l.userId === userId);

        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((l) => l.userId !== userId)
            : [...post.likes, { userId }],
        };
      }),
    );
  };

  const increaseCommentCount = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, commentCount: post.commentCount + 1 }
          : post,
      ),
    );
  };

  const toggleBookmark = async (postId) => {
    // 🔥 optimistic update
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );

    // 🔥 서버 반영
    await toggleBookmarkApi({ postId, userId: user.userId });
  };

  const addPost = async ({ user, images, caption }) => {
    const userId = user.userId;

    // 🔥 UI에 즉시 반영할 임시 post
    const tempPost = {
      id: Date.now(),
      userId,
      images,
      caption,
      commentCount: 0,
      createdAt: new Date().toISOString(),
      user,
      likes: [],
      isBookmarked: false,
    };

    setPosts((prev) => [tempPost, ...prev]);

    // 🔥 서버 호출
    await addPostApi({ userId, images, caption });
  };

  useEffect(() => {
    if (!user) return;

    // 🔥 유저가 변경될 때 pagination 초기화
    // useRef는 즉시 값이 반영되므로 loadPosts에서 올바른 페이지를 사용함
    pageRef.current = 1;
    setPosts([]);
    setHasMore(true);

    loadPosts(); // 첫 페이지 로드
  }, [user]);

  return (
    <PostContext.Provider
      value={{
        posts,
        postLoading,
        loadPosts,
        toggleLike,
        hasMore,
        increaseCommentCount,
        toggleBookmark,
        addPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
