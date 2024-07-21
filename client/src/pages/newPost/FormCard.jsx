import PropTypes from "prop-types";

const FormCard = ({ children }) => {
  return (
    <section className="p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
      {children}
    </section>
  );
};
FormCard.displayName = "NewPost.FormCard";
FormCard.propTypes = {
  children: PropTypes.node,
};

export default FormCard;
