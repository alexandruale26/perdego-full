import PropTypes from "prop-types";

const Section = ({ children }) => {
  return (
    <section className="p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
      {children}
    </section>
  );
};
Section.displayName = "NewPost.Section";
Section.propTypes = {
  children: PropTypes.node,
};

export default Section;
