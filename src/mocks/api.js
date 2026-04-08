import { posts } from "./posts";
import { users as initialUsers } from "./users";

let users = [...initialUsers];

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

      const { password: _, ...userWithoutPassword } = foundUser;

      resolve({
        success: true,
        user: userWithoutPassword,
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

const getFeedPosts = () => {
  return posts.map((post) => {
    const user = users.find((u) => u.userId === post.userId);

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
