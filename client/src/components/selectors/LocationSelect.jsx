import { useEffect, useState, useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import styles from "./shared/styles";
import { parseLocation, sortCities } from "../../utils/citiesHelpers";
import counties from "../../sharedData/counties";
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  ValueContainer,
} from "./shared/Components";

//TODO: message if cities fetch has failed

const LocationSelect = forwardRef(
  ({ name, isInPostForm = false, ...props }, ref) => {
    const [cities, setCities] = useState(null);
    const debounceTimer = useRef(null);
    const latestOptions = useRef([]);

    delete props.value;

    // TODO: better data import
    useEffect(() => {
      const fetchCitiesData = async () => {
        try {
          const response = await fetch("/cities.json");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setCities(data);
        } catch ({ message }) {
          console.log(message);
        }
      };

      fetchCitiesData();
    }, []);

    const handleSelectValueChange = () => {
      return isInPostForm
        ? ({ value }) => props.onChange(value)
        : (value) => value;
    };

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
          label: isInPostForm
            ? filteredCounties.length > 0
              ? "Localitǎți"
              : ""
            : "Localitǎți",
          options: filteredCities
            .map((item) => {
              const { name, commune, county } = parseLocation(item);
              return {
                value: item,
                label: name,
                commune,
                county,
              };
            })
            .sort(sortCities),
        };

        if (isInPostForm) {
          const options = [citiesOption];

          if (filteredCities.length > 0) {
            latestOptions.current = options;
            return callback(options);
          }
        } else {
          filteredCounties = counties.filter((i) =>
            i.name.toLowerCase().includes(searchValue),
          );

          const options = [
            // TODO: think if need to make a separate function to this too
            {
              label: "Județe",
              options: filteredCounties.map((item) => ({
                value: item.id,
                label: item.name,
              })),
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

    return (
      <AsyncSelect
        name={name}
        isClearable={!isInPostForm}
        blurInputOnSelect
        styles={styles(isInPostForm)}
        noOptionsMessage={() =>
          isInPostForm
            ? "Cautǎ dupǎ localitate"
            : "Cautǎ dupǎ localitate sau județ"
        }
        loadingMessage={() => "..."}
        loadOptions={loadOptions}
        placeholder={isInPostForm ? "Cautǎ dupǎ localitate" : "Toatǎ țara"}
        components={{
          ValueContainer: (props) => {
            return <ValueContainer isInPostForm={isInPostForm} {...props} />;
          },
          ClearIndicator,
          DropdownIndicator,
          Option,
        }}
        ref={ref}
        {...props}
        onChange={handleSelectValueChange()}
      />
    );
  },
);
LocationSelect.displayName = "LocationSelect";
LocationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  isInPostForm: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default LocationSelect;

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
