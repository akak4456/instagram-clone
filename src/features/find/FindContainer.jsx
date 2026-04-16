import { usePost } from "../../hooks/usePost";
import {
  FindGrid,
  FindGridItem,
  FindGridImage,
} from "../../styles/features/find.styles";

const FindContainer = () => {
  const { posts } = usePost();
  return (
    <FindGrid>
      {posts.map((post) => (
        <FindGridItem key={post.id}>
          <FindGridImage src={post.images?.[0]} alt={`post-${post.id}`} />
        </FindGridItem>
      ))}
    </FindGrid>
  );
};

export default FindContainer;
