import ReelCardContent from "./ReelCardContent";
import ReelCardSkeleton from "./ReelCardSkeleton";

const ReelsViewer = ({ post, loading = false }) => {
  if (loading || !post) {
    return <ReelCardSkeleton />;
  }

  return <ReelCardContent post={post} />;
};

export default ReelsViewer;
