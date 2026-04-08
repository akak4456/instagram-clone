import { useEffect } from "react";
import { useFollow } from "../../hooks/useFollow";

const HomeTopProfiles = () => {
  const { followingUsers, fetchFollowingUsers } = useFollow();
  console.log("HomeTopProfiles");
  useEffect(() => {
    fetchFollowingUsers();
  }, []);
  return <div>프로필들</div>;
};

export default HomeTopProfiles;
