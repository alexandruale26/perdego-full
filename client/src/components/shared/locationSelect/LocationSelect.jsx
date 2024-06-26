import { useEffect, useState, useRef } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { X, ChevronDown } from "lucide-react";
import judete from "./judete";

const LocationSelect = () => {
  const [cities, setCities] = useState(null);
  const debounceTimer = useRef(null);
  const latestOptions = useRef([]);

  useEffect(() => {
    const fetchJudeteData = async () => {
      try {
        const response = await fetch("/localitati.js");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCities(data);
      } catch {
        console.log("error");
      }
    };

    fetchJudeteData();
  }, []);

  const handleChange = (selectedOption) => {
    console.log(selectedOption?.value);
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
  };

  const loadOptions = (inputValue, callback) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const searchValue = inputValue.trim();

    if (searchValue.length < 2) {
      latestOptions.current = [];
      return callback([]);
    }

    const debounce = setTimeout(() => {
      const filteredJudete = judete
        .filter((j) => j.name.toLowerCase().includes(searchValue.toLowerCase()))
        .sort();

      const startingWithInput = cities
        .filter((l) =>
          l.name.toLowerCase().startsWith(searchValue.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      const containingInput = cities
        .filter(
          (l) =>
            l.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            !l.name.toLowerCase().startsWith(searchValue.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      const filteredLocalitati = [...startingWithInput, ...containingInput];

      const options = [
        {
          label: "Județe",
          options: filteredJudete.map((j) => ({ value: j.id, label: j.name })),
        },
        {
          label: "Localități",
          options: filteredLocalitati.map((l) => ({
            value: l.id,
            label: l.name,
          })),
        },
      ];

      if (filteredLocalitati.length > 0 || filteredJudete.length > 0) {
        latestOptions.current = options;
        return callback(options);
      }

      callback(latestOptions.current);
    }, 300);

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
        // Option,
      }}
    />
  );
};

export default LocationSelect;

const Option = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="text-black" />
    </components.ClearIndicator>
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
