import { posts as initialPosts } from "../data/posts";
import { users as initialUsers } from "../data/users";
import { likes as initialLikes } from "../data/likes";
import { comments as initialComments } from "../data/comments";
import { commentsLikes as initialCommentsLikes } from "../data/commentsLikes";
import { bookmarks as initialBookmarks } from "../data/bookmarks";

import { STORAGE_KEYS } from "./storageKeys";
import { getStorageData, setStorageData } from "./storage";

let users = getStorageData(STORAGE_KEYS.users, initialUsers);
let posts = getStorageData(STORAGE_KEYS.posts, initialPosts);
let likes = getStorageData(STORAGE_KEYS.likes, initialLikes);
let comments = getStorageData(STORAGE_KEYS.comments, initialComments);
let commentsLikes = getStorageData(
  STORAGE_KEYS.commentsLikes,
  initialCommentsLikes,
);
let bookmarks = getStorageData(STORAGE_KEYS.bookmarks, initialBookmarks);

export const state = {
  get users() {
    return users;
  },
  set users(value) {
    users = value;
  },

  get posts() {
    return posts;
  },
  set posts(value) {
    posts = value;
  },

  get likes() {
    return likes;
  },
  set likes(value) {
    likes = value;
  },

  get comments() {
    return comments;
  },
  set comments(value) {
    comments = value;
  },

  get commentsLikes() {
    return commentsLikes;
  },
  set commentsLikes(value) {
    commentsLikes = value;
  },

  get bookmarks() {
    return bookmarks;
  },
  set bookmarks(value) {
    bookmarks = value;
  },
};

export const syncUsers = () => setStorageData(STORAGE_KEYS.users, users);
export const syncPosts = () => setStorageData(STORAGE_KEYS.posts, posts);
export const syncLikes = () => setStorageData(STORAGE_KEYS.likes, likes);
export const syncComments = () =>
  setStorageData(STORAGE_KEYS.comments, comments);
export const syncCommentsLikes = () =>
  setStorageData(STORAGE_KEYS.commentsLikes, commentsLikes);
export const syncBookmarks = () =>
  setStorageData(STORAGE_KEYS.bookmarks, bookmarks);

export const resetMockData = () => {
  users = [...initialUsers];
  posts = [...initialPosts];
  likes = [...initialLikes];
  comments = [...initialComments];
  commentsLikes = [...initialCommentsLikes];
  bookmarks = [...initialBookmarks];

  syncUsers();
  syncPosts();
  syncLikes();
  syncComments();
  syncCommentsLikes();
  syncBookmarks();
};

export const clearMockStorage = () => {
  localStorage.removeItem(STORAGE_KEYS.users);
  localStorage.removeItem(STORAGE_KEYS.posts);
  localStorage.removeItem(STORAGE_KEYS.likes);
  localStorage.removeItem(STORAGE_KEYS.comments);
  localStorage.removeItem(STORAGE_KEYS.commentsLikes);
  localStorage.removeItem(STORAGE_KEYS.bookmarks);

  users = [...initialUsers];
  posts = [...initialPosts];
  likes = [...initialLikes];
  comments = [...initialComments];
  commentsLikes = [...initialCommentsLikes];
  bookmarks = [...initialBookmarks];
};
