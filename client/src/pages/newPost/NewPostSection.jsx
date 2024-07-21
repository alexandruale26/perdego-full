import PropTypes from "prop-types";

const NewPostSection = ({ children }) => {
  return (
    <section className="p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
      {children}
    </section>
  );
};
NewPostSection.displayName = "NewPost.Section";
NewPostSection.propTypes = {
  children: PropTypes.node,
};

export default NewPostSection;
