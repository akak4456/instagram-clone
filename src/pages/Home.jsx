import HomeTopProfiles from "../features/home/HomeTopProfiles";

const Home = () => {
  return (
    <>
      <HomeTopProfiles />
      {/* {posts.map((post) => (
        <div key={post.id}>
          <img src={post.images[0]} alt="" />
          <p>{post.caption}</p>

          <button onClick={() => toggleLike(post.id)}>
            {post.isLiked ? "❤️" : "🤍"}
          </button>

          <span>{post.likeCount} likes</span>
        </div>
      ))} */}
    </>
  );
};

export default Home;
