import { useEffect, useState } from "react";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { X, ChevronDown } from "lucide-react";
import judete from "./judete";

const LocationSelect = () => {
  const [cities, setCities] = useState(null);
  const [debounceTimer, setDebounceTimer] = useState(null);

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
    if (debounceTimer) clearTimeout(debounceTimer);

    const debounce = setTimeout(() => {
      if (inputValue.length < 2) callback([]);

      const filteredJudete = judete.filter((j) => {
        return j.name.toLowerCase().includes(inputValue.toLowerCase());
      });

      const localitatiResults = cities.filter((c) =>
        c.name.toLowerCase().includes(inputValue.toLowerCase()),
      );

      const options = [
        {
          label: "Județe",
          options: filteredJudete.map((j) => ({ value: j.id, label: j.name })),
        },
        {
          label: "Localități",
          options: localitatiResults.map((l) => ({
            value: l.id,
            label: l.name,
          })),
        },
      ];

      callback(options);
    }, 300);

    setDebounceTimer(debounce);
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
      }}
    />
  );
};

export default LocationSelect;

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
