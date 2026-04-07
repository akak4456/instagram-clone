import { usePost } from "../contexts/PostContext";

const Home = () => {
  const { posts, loading, toggleLike } = usePost();

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <img src={post.images[0]} alt="" />
          <p>{post.caption}</p>

          <button onClick={() => toggleLike(post.id)}>
            {post.isLiked ? "❤️" : "🤍"}
          </button>

          <span>{post.likeCount} likes</span>
        </div>
      ))}
    </div>
  );
};

export default Home;
