import PropTypes from "prop-types";

const BasicAuthHeader = ({ title }) => {
  return (
    <div className="w-full h-14 flex items-start border-b border-b-primary">
      <h3 className="w-full h-full text-xl pl-4  border-b-0">{title}</h3>
    </div>
  );
};
BasicAuthHeader.displayName = "BasicAuthHeader";
BasicAuthHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BasicAuthHeader;
