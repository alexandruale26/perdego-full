import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  ValueContainer,
} from "./SelectComponents";
import customStyles from "./js/customStyles";
import { parseLocation, sortCities } from "./js/helpers.js";
import counties from "./js/judete";

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
      const filteredCounties = counties.filter((i) =>
        i.name.toLowerCase().includes(searchValue),
      );

      const valueWithReplacements = searchValue
        .replace(/-/g, "+")
        .replace(/\s+/g, "-");

      const filteredCities = cities.filter((i) => {
        const parts = i.includes("-c_") ? i.split("-c_") : i.split("-j_");
        const cityPart = parts[0].toLowerCase();

        return cityPart.includes(valueWithReplacements);
      });

      const options = [
        {
          label: "Județe",
          options: filteredCounties.map((i) => ({
            value: i.id,
            label: i.name,
          })),
        },
        {
          label: filteredCounties.length > 0 ? "Localitǎți" : "",
          options: filteredCities
            .map((i) => {
              const { name, commune, county } = parseLocation(i);
              return {
                value: i,
                label: name,
                commune,
                county,
              };
            })
            .sort(sortCities),
        },
      ];

      if (filteredCities.length > 0 || filteredCounties.length > 0) {
        latestOptions.current = options;
        return callback(options);
      }

      callback(latestOptions.current);
    }, 400);

    debounceTimer.current = debounce;
  };

  return (
    <AsyncSelect
      name={name}
      isClearable
      blurInputOnSelect
      styles={customStyles(isForm)}
      noOptionsMessage={() =>
        isForm ? "Cautǎ dupǎ localitate sau județ" : "Cautǎ dupǎ localitate"
      }
      loadingMessage={() => "..."}
      loadOptions={loadOptions}
      placeholder={isForm ? "Toatǎ țara" : "Cautǎ dupǎ localitate"}
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
