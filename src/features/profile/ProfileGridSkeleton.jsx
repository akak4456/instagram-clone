import {
  ProfileGrid,
  ProfileGridItem,
  SkeletonBlock,
} from "../../styles/features/profile.styles";

const ProfileGridSkeleton = ({ count = 10 }) => {
  return (
    <ProfileGrid>
      {Array.from({ length: count }).map((_, index) => (
        <ProfileGridItem key={index}>
          <SkeletonBlock width="100%" height="100%" radius="0" />
        </ProfileGridItem>
      ))}
    </ProfileGrid>
  );
};

export default ProfileGridSkeleton;
