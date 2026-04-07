import { users } from "./users";
import { posts } from "./posts";

const getFeedPosts = () => {
  return posts.map((post) => {
    const user = users.find((u) => u.username === post.username);

    return {
      ...post,
      user,
    };
  });
};

export const fetchFeed = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFeedPosts());
    }, 500);
  });
};
