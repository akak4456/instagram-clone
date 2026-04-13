import { Ring, Inner, Profile } from "../styles/components/ProfileImage.styles";

const ProfileImage = ({ user, type = "small" }) => {
  return (
    <Ring type={type}>
      <Inner>
        <Profile src={user?.profileImage} type={type} />
      </Inner>
    </Ring>
  );
};

export default ProfileImage;
