import { posts as initialPosts } from "./posts";
import { users as initialUsers } from "./users";
import { likes as initialLikes } from "./likes";
import { comments as initialComments } from "./comments";

let users = [...initialUsers];
let posts = [...initialPosts];
let likes = [...initialLikes];
let comments = [...initialComments];

export const fetchUsersApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 300);
  });
};

export const loginApi = ({ userId, password }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundUser = users.find((u) => u.userId === userId);

      if (!foundUser || foundUser.password !== password) {
        resolve({
          success: false,
          message: "입력하신 로그인 정보가 잘못되었습니다.",
        });
        return;
      }

      resolve({
        success: true,
        user: { userId: foundUser.userId },
      });
    }, 500);
  });
};

export const addUserApi = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existsUserId = users.some((u) => u.userId === newUser.userId);
      if (existsUserId) {
        resolve({
          success: false,
          message: "이미 사용 중인 휴대폰 번호 또는 이메일입니다.",
        });
        return;
      }

      const existsUsername = users.some((u) => u.username === newUser.username);
      if (existsUsername) {
        resolve({
          success: false,
          message: "이미 사용 중인 사용자 이름입니다.",
        });
        return;
      }

      const newUserData = {
        ...newUser,
        profileImage: "",
        bio: "",
        following: [],
      };

      users.push(newUserData);

      resolve({
        success: true,
        user: newUserData,
      });
    }, 2000);
  });
};

export const fetchFollowingUsersApi = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = users.find((u) => u.userId === userId);

      if (!currentUser) {
        resolve({
          success: false,
          message: "유저를 찾을 수 없습니다.",
        });
        return;
      }

      const followingUsers = users.filter((u) =>
        currentUser.following.includes(u.userId),
      );

      resolve({
        success: true,
        users: followingUsers,
      });
    }, 300);
  });
};

const getFeedPosts = () => {
  return posts.map((post) => {
    const user = users.find((u) => u.userId === post.userId);
    const likesFiltered = likes.filter((l) => l.postId === post.id);
    const commentFiltered = comments.filter((c) => c.postId === post.id);

    return {
      ...post,
      user,
      likes: likesFiltered,
      comments: commentFiltered,
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
