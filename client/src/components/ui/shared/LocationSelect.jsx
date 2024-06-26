import { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { X, ChevronDown } from "lucide-react";
import judete from "./judete";

const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

const LocationSelect = () => {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJudeteData = async () => {
      try {
        const response = await fetch("/localitati.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJudeteData();
  }, []);

  const handleChange = (selectedOption) => {
    console.log(selectedOption?.value);
  };

  const ClearIndicator = (props) => {
    return (
      <components.ClearIndicator {...props}>
        <X className="text-black" />
      </components.ClearIndicator>
    );
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown className="text-black" />
      </components.DropdownIndicator>
    );
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

  return (
    <Select
      isClearable
      blurInputOnSelect
      styles={customStyles}
      options={options.map((option) => ({ value: option, label: option }))}
      onChange={handleChange}
      placeholder="Locație"
      components={{
        ClearIndicator,
        DropdownIndicator,
      }}
    />
  );
};

export default LocationSelect;
