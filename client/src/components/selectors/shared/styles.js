export default ({ darkBackground, showSeparator, icon }) => ({
  control: (provided, { isFocused }) => ({
    ...provided,
    height: "3.5rem",
    backgroundColor: darkBackground ? "var(--grey6)" : "transparent",
    borderRadius: "0.375rem",
    borderColor: isFocused ? "var(--primary)" : "var(--grey4)",
    cursor: "pointer",
    boxShadow: isFocused ? "0 0 0 1px var(--primary)" : provided.boxShadow,
    "&:hover": {
      borderColor: isFocused ? "var(--primary)" : "var(--grey4)",
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0.375rem",
    overflow: "hidden",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    backgroundColor: darkBackground ? "var(--grey6)" : "#fff",
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
  option: (provided, { isFocused }) => ({
    ...provided,
    backgroundColor: isFocused ? "var(--primary)" : "transparent",
    borderBottom: "1px solid #eee",
    color: isFocused ? "#fff" : "var(--grey)",
    cursor: "pointer",
    ":active": {
      backgroundColor: isFocused ? "var(--primary)" : "inherit",
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

const getPadding = (icon) => (icon ? "2.4rem" : "1rem");
