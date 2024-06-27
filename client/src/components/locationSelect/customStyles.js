export default {
  control: (provided, state) => ({
    ...provided,
    // height: "3.5rem",
    borderColor: state.isFocused ? "var(--primary)" : provided.borderColor,
    boxShadow: state.isFocused
      ? "0 0 0 1px var(--primary)"
      : provided.boxShadow,
    "&:hover": {
      borderColor: state.isFocused ? "var(--primary)" : provided.borderColor,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: "bold",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--grey2)",
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: 700,
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
    fontWeight: 700,
    textTransform: "none",
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
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
};
