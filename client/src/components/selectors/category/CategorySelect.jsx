import PropTypes from "prop-types";
import Select from "react-select";
import { ClearIndicator, DropdownIndicator } from "../shared/Components";
import styles from "../shared/styles";
import categories from "./js/categories";

const CategorySelect = ({ name, isForm = false, ...props }) => {
  return (
    <Select
      name={name}
      defaultValue={"Electronice"}
      blurInputOnSelect
      isClearable={!isForm}
      isSearchable={false}
      styles={styles(isForm)}
      placeholder={isForm ? "Toate categoriile" : "Alege o categorie"}
      options={categories}
      components={{
        ClearIndicator,
        DropdownIndicator,
      }}
      {...props}
    />
  );
};
CategorySelect.displayName = "CategorySelect";
CategorySelect.propTypes = {
  name: PropTypes.string.isRequired,
  isForm: PropTypes.bool,
};

export default CategorySelect;
