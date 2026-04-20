import { AuthProvider } from "./AuthContext";
import { StoryProvider } from "./StoryContext";
import { SocialProvider } from "./SocialProvider";
import { FeedProvider } from "./FeedProvider";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <SocialProvider>
        <FeedProvider>
          <StoryProvider>{children}</StoryProvider>
        </FeedProvider>
      </SocialProvider>
    </AuthProvider>
  );
};
