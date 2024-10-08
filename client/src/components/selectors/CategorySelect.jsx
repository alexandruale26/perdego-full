import { forwardRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styles from "./shared/styles";
import categories from "../../sharedData/categories";
import {
  ClearIndicator,
  DropdownIndicator,
  ValueContainer,
} from "./shared/Components";

const CategorySelect = forwardRef(
  ({ usedInPostCreate, isClearable, defaultValue, options, ...props }, ref) => {
    delete props.value;

    const categoryData = categories.find((item) => item.value === defaultValue);

    return (
      <Select
        key={usedInPostCreate ? "category" : categoryData}
        defaultValue={categoryData}
        blurInputOnSelect
        isClearable={isClearable}
        isSearchable={false}
        styles={styles(options)}
        placeholder={
          usedInPostCreate ? "Alege o categorie" : "Toate categoriile"
        }
        options={categories}
        components={{
          ValueContainer: (props) => {
            return <ValueContainer icon={options.icon} {...props} />;
          },
          ClearIndicator,
          DropdownIndicator,
        }}
        ref={ref}
        {...props}
        onChange={(value) => props.onChange(value?.value ?? "")}
      />
    );
  },
);
CategorySelect.displayName = "CategorySelect";
CategorySelect.propTypes = {
  name: PropTypes.string.isRequired,
  usedInPostCreate: PropTypes.bool.isRequired,
  isClearable: PropTypes.bool.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  options: PropTypes.shape({
    darkBackground: PropTypes.bool,
    showSeparator: PropTypes.bool,
    icon: PropTypes.string,
  }).isRequired,
};

export default CategorySelect;
