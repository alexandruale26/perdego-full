import PropTypes from "prop-types";
import { Check, CircleAlert } from "lucide-react";

const iconSize = 24;

const AddValidation = ({ fieldValidity: { error, invalid } }) => {
  if (!invalid) return null;

  return error ? <CircleAlert size={iconSize} /> : <Check size={iconSize} />;
};
AddValidation.displayName = "AddValidation";
AddValidation.propTypes = {
  fieldValidity: PropTypes.shape({
    error: (props, propName, componentName) => {
      if (
        props[propName] === undefined ||
        typeof props[propName] === "string"
      ) {
        return null;
      }
      return new Error(
        `Invalid prop \`${propName}\` supplied to` +
          ` \`${componentName}\`. Expected \`undefined\` or \`string\`.`,
      );
    },
    invalid: PropTypes.bool.isRequired,
  }),
};

export default AddValidation;
