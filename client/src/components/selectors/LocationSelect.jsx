import { useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import styles from "./shared/styles";
import counties from "../../sharedData/counties";
import cities from "../../sharedData/cities";
import {
  parseCity,
  sortCities,
  parseCounty,
} from "../../utils/locationSelectHelpers";
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  ValueContainer,
} from "./shared/Components";

const LocationSelect = forwardRef(
  ({ usedInPostCreate, isClearable, defaultValue, options, ...props }, ref) => {
    const debounceTimer = useRef(null);
    const latestOptions = useRef([]);
    delete props.value;

    const loadOptions = (inputValue, callback) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      let searchValue = removeDiacritics(inputValue.trim());

      if (searchValue.length < 3) {
        latestOptions.current = [];
        return callback([]);
      }

      searchValue = searchValue.toLowerCase();

      const debounce = setTimeout(() => {
        let filteredCounties = [];

        const valueWithReplacements = searchValue
          .replace(/-/g, "+")
          .replace(/\s+/g, "-");

        const filteredCities = cities.filter((i) => {
          const parts = i.includes("-c_") ? i.split("-c_") : i.split("-j_");
          const cityPart = parts[0].toLowerCase();

          return cityPart.includes(valueWithReplacements);
        });

        const citiesOption = {
          label: usedInPostCreate
            ? filteredCounties.length > 0
              ? "Localitǎți"
              : ""
            : "Localitǎți",
          options: filteredCities
            .map((city) => parseCity(city))
            .sort(sortCities),
        };

        if (usedInPostCreate) {
          const options = [citiesOption];

          if (filteredCities.length > 0) {
            latestOptions.current = options;
            return callback(options);
          }
        } else {
          filteredCounties = counties.filter((i) => {
            return i.split("-j_")[1].toLowerCase().includes(searchValue);
          });

          const options = [
            {
              label: "Județe",
              options: filteredCounties.map((county) => parseCounty(county)),
            },
            citiesOption,
          ];

          if (filteredCities.length > 0 || filteredCounties.length > 0) {
            latestOptions.current = options;
            return callback(options);
          }
        }

        callback(latestOptions.current);
      }, 400);

      debounceTimer.current = debounce;
    };

    const getLocationData = () => {
      if (defaultValue) {
        if (defaultValue.startsWith("-j_")) return parseCounty(defaultValue);
        return parseCity(defaultValue);
      }
      return null;
    };
    const locationData = getLocationData();

    return (
      <AsyncSelect
        key={usedInPostCreate ? "location" : locationData}
        defaultValue={locationData}
        blurInputOnSelect
        isClearable={isClearable}
        styles={styles(options)}
        noOptionsMessage={() =>
          usedInPostCreate
            ? "Cautǎ dupǎ localitate"
            : "Cautǎ dupǎ localitate sau județ"
        }
        loadingMessage={() => "..."}
        loadOptions={loadOptions}
        placeholder={usedInPostCreate ? "Cautǎ dupǎ localitate" : "Toatǎ țara"}
        components={{
          ValueContainer: (props) => {
            return <ValueContainer icon={options.icon} {...props} />;
          },
          ClearIndicator,
          DropdownIndicator,
          Option,
        }}
        ref={ref}
        {...props}
        onChange={(value) => props.onChange(value?.value ?? "")}
      />
    );
  },
);
LocationSelect.displayName = "LocationSelect";
LocationSelect.propTypes = {
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

export default LocationSelect;

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
