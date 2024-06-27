import { useEffect, useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import { Option, ClearIndicator, DropdownIndicator } from "./SelectComponents";
import customStyles from "./customStyles";
import judete from "./judete";

// TODO: disable Search button in search bar
const LocationSelect = () => {
  const [cities, setCities] = useState(null);
  const debounceTimer = useRef(null);
  const latestOptions = useRef([]);

  useEffect(() => {
    const fetchJudeteData = async () => {
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

    fetchJudeteData();
  }, []);

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
  };

  const loadOptions = (inputValue, callback) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    let searchValue = inputValue.trim();

    if (searchValue.length < 3) {
      latestOptions.current = [];
      return callback([]);
    }

    searchValue = searchValue.toLowerCase();

    const debounce = setTimeout(() => {
      const filteredCounties = judete.filter((i) =>
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
      isClearable
      blurInputOnSelect
      styles={customStyles}
      noOptionsMessage={() => "Cautǎ dupǎ localitate sau județ"}
      loadingMessage={() => "..."}
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Toatǎ țara"
      components={{
        ClearIndicator,
        DropdownIndicator,
        Option,
      }}
    />
  );
};

export default LocationSelect;

const parseLocation = (location) => {
  let name = "";
  let commune = "";
  let county = "";

  const parts = location.split("-j_");
  if (parts.length > 0) {
    let nameAndCommune = parts[0];
    const communeIndex = nameAndCommune.lastIndexOf("-c_");

    if (communeIndex !== -1) {
      commune = nameAndCommune.substring(communeIndex + 3);
      name = nameAndCommune.substring(0, communeIndex);
    } else {
      name = nameAndCommune;
    }

    name = replaceDashAndPlus(name);
    commune = replaceDashAndPlus(commune);
  }

  county = replaceDashAndPlus(parts[1]);

  return { name, commune, county };
};

const replaceDashAndPlus = (string) =>
  string.replace(/-/g, " ").replace(/\+/g, "-");

const sortCities = (a, b) => {
  return a.label.length - b.label.length || a.county.localeCompare(b.county);
};
