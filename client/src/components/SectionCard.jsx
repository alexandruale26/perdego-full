import PropTypes from "prop-types";

const SectionCard = ({ children }) => {
  return (
    <section className="p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
      {children}
    </section>
  );
};
SectionCard.displayName = "SectionCard";
SectionCard.propTypes = {
  children: PropTypes.node,
};

export default SectionCard;
