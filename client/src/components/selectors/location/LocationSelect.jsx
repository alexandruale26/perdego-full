import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  ValueContainer,
} from "../shared/Components";
import styles from "../shared/styles";
import { parseLocation, sortCities } from "./js/helpers.js";
import counties from "./js/judete.js";

//TODO: move judete to data folder later
//TODO: message if judete fetch has failed/ change judete name

const LocationSelect = ({ name, isForm = false, ...props }) => {
  const [cities, setCities] = useState(null);
  const debounceTimer = useRef(null);
  const latestOptions = useRef([]);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const response = await fetch("/localitati.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setCities(data);
      } catch (err) {
        console.log("error fetching localitati", err.message);
      }
    };

    fetchCitiesData();
  }, []);

  const loadOptions = (inputValue, callback) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    let searchValue = inputValue.trim();

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

      // TODO: make separate function
      const citiesOption = {
        label: isForm
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

      if (isForm) {
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
          // TODO: make separate function to this too
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
      isClearable={!isForm}
      blurInputOnSelect
      styles={styles(isForm)}
      noOptionsMessage={() =>
        isForm ? "Cautǎ dupǎ localitate" : "Cautǎ dupǎ localitate sau județ"
      }
      loadingMessage={() => "..."}
      loadOptions={loadOptions}
      placeholder={isForm ? "Cautǎ dupǎ localitate" : "Toatǎ țara"}
      components={{
        ValueContainer: (props) => {
          return <ValueContainer isForm={isForm} {...props} />;
        },
        ClearIndicator,
        DropdownIndicator,
        Option,
      }}
      {...props}
    />
  );
};
LocationSelect.displayName = "LocationSelect";
LocationSelect.propTypes = {
  name: PropTypes.string.isRequired,
  isForm: PropTypes.bool,
};

export default LocationSelect;
