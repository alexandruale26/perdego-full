import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const PostInfoCard = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        "w-full py-4 px-6 border border-grey-6 rounded-lg shadow-md space-y-2",
        className,
      )}
    >
      <p className="font-bold">{title}</p>
      {children}
    </div>
  );
};
PostInfoCard.displayName = "PostInfoCard";
PostInfoCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostInfoCard;
