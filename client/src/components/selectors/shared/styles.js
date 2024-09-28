export default ({
  darkFocus,
  darkBackground,
  darkSelect,
  showSeparator,
  icon,
}) => ({
  control: (provided, state) => ({
    ...provided,
    height: "3.5rem",
    backgroundColor: darkBackground ? "var(--grey6)" : "transparent",
    borderRadius: "0.375rem",
    borderColor: getBorderColor(state.isFocused, darkFocus),
    cursor: "pointer",
    boxShadow: state.isFocused
      ? darkFocus
        ? "0 0 0 1px var(--primary)"
        : "0 0 0 1px var(--secondary)"
      : provided.boxShadow,
    "&:hover": {
      borderColor: getBorderColor(state.isFocused, darkFocus),
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    overflow: "hidden",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: 600,
    paddingLeft: getPadding(icon),
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--grey3)",
    paddingLeft: getPadding(icon),
  }),
  input: (provided) => ({
    ...provided,
    color: "var(--black)",
    fontWeight: 600,
    paddingLeft: getPadding(icon),
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused
      ? darkSelect
        ? "var(--primary)"
        : "var(--secondary)"
      : "transparent",
    borderBottom: "1px solid #eee",
    color: isFocused ? (darkSelect ? "#fff" : "var(--black)") : "var(--grey)",
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
    display: showSeparator ? "block" : "none",
    backgroundColor: "var(--grey4)",
  }),
});

const getBorderColor = (isFocused, darkFocus) => {
  return isFocused
    ? darkFocus
      ? "var(--primary)"
      : "var(--secondary)"
    : "var(--grey4)";
};

const getPadding = (icon) => (icon ? "2.4rem" : "1rem");
