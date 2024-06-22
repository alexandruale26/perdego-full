import PropTypes from "prop-types";

const BasicAuthenticateHeader = ({ title = undefined }) => {
  if (!title) throw new Error("<BasicAuthenticateHeader> must have a 'title'");

  return (
    <div className="w-full h-14 flex items-start border-b border-b-primary">
      <h3 className="w-full h-full text-lg pl-4  border-b-0">{title}</h3>
    </div>
  );
};
BasicAuthenticateHeader.displayName = "BasicAuthenticateHeader";
BasicAuthenticateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BasicAuthenticateHeader;
