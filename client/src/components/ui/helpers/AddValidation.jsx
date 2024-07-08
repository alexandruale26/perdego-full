import PropTypes from "prop-types";
import { Check, CircleAlert } from "lucide-react";

const AddValidation = ({ fieldValidity: { error, invalid, isDirty } }) => {
  if (!invalid && !isDirty) return null;

  return error ? (
    <CircleAlert className="text-destructive" />
  ) : (
    <Check className="text-success" />
  );
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
    isDirty: PropTypes.bool.isRequired,
  }),
};

export default AddValidation;
