import { forwardRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { ClearIndicator, DropdownIndicator } from "../shared/Components";
import styles from "../shared/styles";
import categories from "./categories";

const CategorySelect = forwardRef(
  ({ name, isInPostForm = false, ...props }, ref) => {
    delete props.value;

    return (
      <Select
        name={name}
        defaultValue={"Electronice"}
        blurInputOnSelect
        isClearable={!isInPostForm}
        isSearchable={false}
        styles={styles(isInPostForm)}
        placeholder={isInPostForm ? "Alege o categorie" : "Toate categoriile"}
        options={categories}
        components={{
          ClearIndicator,
          DropdownIndicator,
        }}
        ref={ref}
        {...props}
        onChange={({ value }) => props.onChange(value)}
      />
    );
  },
);
CategorySelect.displayName = "CategorySelect";
CategorySelect.propTypes = {
  name: PropTypes.string.isRequired,
  isInPostForm: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default CategorySelect;
