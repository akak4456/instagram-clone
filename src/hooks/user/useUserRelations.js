import { useCallback } from "react";
import {
  removeFollower,
  unfollowUser,
  followUser,
} from "../../services/userService";

const useUserRelations = ({ refreshUserList, setRelationLoadingByKey }) => {
  const removeFollowerAction = useCallback(
    async ({ profileUserId, followerUserId }) => {
      const loadingKey = `removeFollower:${followerUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await removeFollower({ profileUserId, followerUserId });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("팔로워 제거 실패:", error);
        return {
          success: false,
          message: "팔로워 제거 중 오류가 발생했습니다.",
        };
      } finally {
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

  const unfollowUserAction = useCallback(
    async ({ profileUserId, targetUserId }) => {
      const loadingKey = `unfollow:${targetUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await unfollowUser({ profileUserId, targetUserId });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("언팔로우 실패:", error);
        return {
          success: false,
          message: "언팔로우 중 오류가 발생했습니다.",
        };
      } finally {
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

  const followUserAction = useCallback(
    async ({ currentUserId, targetUserId }) => {
      const loadingKey = `follow:${targetUserId}`;
      setRelationLoadingByKey(loadingKey, true);

      try {
        const result = await followUser({ currentUserId, targetUserId });

        if (result.success) {
          await refreshUserList();
        }

        return result;
      } catch (error) {
        console.error("팔로우 실패:", error);
        return {
          success: false,
          message: "팔로우 처리 중 오류가 발생했습니다.",
        };
      } finally {
        setRelationLoadingByKey(loadingKey, false);
      }
    },
    [refreshUserList, setRelationLoadingByKey],
  );

  return {
    removeFollowerAction,
    unfollowUserAction,
    followUserAction,
  };
};

export default useUserRelations;
