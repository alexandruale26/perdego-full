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
  ({ usedInPostCreate, isClearable, options, ...props }, ref) => {
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
          console.log(message); // TODO: Pagina a aparut o problema
        }
      };

      fetchCitiesData();
    }, []);

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

        if (usedInPostCreate) {
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
  options: PropTypes.shape({
    darkFocus: PropTypes.bool,
    darkBackground: PropTypes.bool,
    darkSelect: PropTypes.bool,
    showSeparator: PropTypes.bool,
    icon: PropTypes.string,
  }).isRequired,
};

export default LocationSelect;

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
