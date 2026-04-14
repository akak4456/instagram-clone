import {
  ProfileGrid,
  ProfileGridItem,
  ProfileGridImage,
} from "./profile.styles";

const ProfilePostGrid = ({ posts }) => {
  return (
    <ProfileGrid>
      {posts.map((post) => (
        <ProfileGridItem key={post.id}>
          <ProfileGridImage src={post.images?.[0]} alt={`post-${post.id}`} />
        </ProfileGridItem>
      ))}
    </ProfileGrid>
  );
};

export default ProfilePostGrid;
