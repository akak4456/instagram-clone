import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const HomeTopProfiles = () => {
  const { followingUsers, fetchFollowingUsers } = useAuth();
  console.log("HomeTopProfiles");
  useEffect(() => {
    fetchFollowingUsers();
  }, []);
  return <div>프로필들</div>;
};

export default HomeTopProfiles;
