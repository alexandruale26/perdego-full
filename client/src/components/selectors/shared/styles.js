const padddingIsForm = "0.75rem";
const padddingIsNotForm = "2.5rem";

export default (isForm = false) => ({
  control: (provided, state) => ({
    ...provided,
    height: "3.5rem",
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "var(--primary)" : "var(--grey4)",
    cursor: "pointer",
    boxShadow: state.isFocused
      ? "0 0 0 1px var(--primary)"
      : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : "var(--grey4)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    overflow: "hidden",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: 600,
    paddingLeft: isForm ? padddingIsForm : padddingIsNotForm,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--grey3)",
    paddingLeft: isForm ? padddingIsForm : padddingIsNotForm,
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: 600,
    paddingLeft: isForm ? padddingIsForm : padddingIsNotForm,
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused ? "var(--primary)" : "transparent",
    borderBottom: "1px solid #eee",
    color: isFocused ? "#fff" : "var(--grey)",
    cursor: "pointer",
    ":active": {
      backgroundColor: isFocused
        ? "var(--primary)"
        : isSelected
          ? "var(--primary)"
          : "inherit",
      color: isFocused ? "#fff" : isSelected ? "#fff" : "var(--grey2)",
    },
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "none",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "var(--primary)",
    fontSize: "0.875rem",
  }),
  loadingMessage: (provided) => ({
    ...provided,
    fontSize: "1.5rem",
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    color: "var(--primary)",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: isForm ? "none" : "block",
    backgroundColor: "var(--grey4)",
  }),
});
