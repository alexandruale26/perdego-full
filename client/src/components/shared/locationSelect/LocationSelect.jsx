/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { X, ChevronDown } from "lucide-react";
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      // height: "3.5rem",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
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
      color: isFocused ? "#fff" : "var(--grey2)",
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
  };

  const loadOptions = (inputValue, callback) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const searchValue = inputValue.trim().toLowerCase();

    if (searchValue.length < 3) {
      latestOptions.current = [];
      return callback([]);
    }

    const debounce = setTimeout(() => {
      const filteredCounties = judete.filter((i) =>
        i.name.toLowerCase().includes(searchValue.toLowerCase()),
      );

      const valueWithReplacements = inputValue
        .replace(/-/g, "+")
        .replace(/\s+/g, "-");

      const startingWithInput = cities.filter((i) =>
        i.toLowerCase().startsWith(valueWithReplacements.toLowerCase()),
      );

      const xx = cities.filter((city) => {
        const parts = city.includes("-c_")
          ? city.split("-c_")
          : city.split("-j_");

        const cityPart = parts[0].toLowerCase();

        return cityPart.includes(valueWithReplacements);

        // TODO: continue from here
      });

      const filteredLocalitati = [...xx];

      const options = [
        {
          label: "Județ",
          options: filteredCounties.map((j) => ({
            value: j.id,
            label: j.name,
          })),
        },
        {
          label: filteredCounties.length > 0 ? "Localitǎți" : "",
          options: filteredLocalitati
            .map((l) => {
              const { name, commune, county } = parseLocation(l);

              return {
                value: l,
                label: name,
                commune,
                county,
              };
            })
            .sort(sortCities),
        },
      ];

      if (filteredLocalitati.length > 0 || filteredCounties.length > 0) {
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

function parseLocation(location) {
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
}

const replaceDashAndPlus = (string) =>
  string.replace(/-/g, " ").replace(/\+/g, "-");

const sortCities = (a, b) => {
  if (a.label.length < b.label.length) return -1;
  if (a.label.length > b.label.length) return 1;

  // if (!a.commune && b.commune) return -1;
  // if (a.commune && !b.commune) return 1;

  if (a.county < b.county) return -1;
  if (a.county > b.county) return 1;

  return 0;
};

const matchesSearchCriteria = (city, searchValue) => {
  const regexPattern = new RegExp(
    `${searchValue}(?=.*(?:-c_|-j_))|[^-]*-${searchValue}(?=[^-]*(-c_|-j_))`,
  );
  // const regexPattern = new RegExp(
  //   `^[^-]*-${searchValue}[^-]*(-c_[^-]*)?(-j_[^-]*)?$`,
  // );

  return regexPattern.test(city.toLowerCase());
};

const Option = (props) => {
  const { data } = props;

  return data?.county ? (
    <components.Option {...props}>
      <div className="flex flex-col">
        <p>{data.label}</p>
        <div className="flex font-light">
          {data.commune && (
            <span className="text-xs">{data.commune} -&nbsp;</span>
          )}
          <span className="text-xs"> {data.county}</span>
        </div>
      </div>
    </components.Option>
  ) : (
    <components.Option {...props} />
  );
};

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="text-black" />
    </components.ClearIndicator>
  );
};

const DropdownIndicator = () => {
  return <ChevronDown className="text-black" />;
};
