import { UserProvider } from "./UserContext";
import { FollowProvider } from "./FollowContext";

export const SocialProvider = ({ children }) => {
  return (
    <UserProvider>
      <FollowProvider>{children}</FollowProvider>
    </UserProvider>
  );
};
