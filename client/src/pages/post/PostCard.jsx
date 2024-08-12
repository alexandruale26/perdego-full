import PropTypes from "prop-types";

const PostCard = ({ title, children, className }) => {
  return <div>PostCard</div>;
};
PostCard.displayName = "PostCard";
PostCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PostCard;
