import PropTypes from "prop-types";
import { components } from "react-select";
import { X, MapPin, Package, ChevronDown } from "lucide-react";

export const Option = (props) => {
  const { data } = props;

  return data?.county ? (
    <components.Option {...props}>
      <div className="flex flex-col">
        <p>{data.label}</p>
        <div className="flex font-light text-xs">
          <span>{data.county}</span>
          {data.commune && <span> &nbsp;- {data.commune}</span>}
        </div>
      </div>
    </components.Option>
  ) : (
    <components.Option {...props}>
      <div className="flex flex-col">
        <p>{data.label}</p>
        <span className="text-xs font-light">Tot judetul</span>
      </div>
    </components.Option>
  );
};
Option.displayName = "Select.Option";
Option.propTypes = {
  data: PropTypes.shape({
    county: PropTypes.string,
    label: PropTypes.string,
    commune: PropTypes.string,
  }).isRequired,
};

export const ValueContainer = ({ icon, children, ...props }) => {
  return (
    <components.ValueContainer {...props}>
      {getIcon(icon)}
      {children}
    </components.ValueContainer>
  );
};
ValueContainer.displayName = "Select.ValueContainer";
ValueContainer.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
};

export const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <X className="text-black" />
    </components.ClearIndicator>
  );
};
ClearIndicator.displayName = "Select.ClearIndicator";

export const DropdownIndicator = () => {
  return (
    <div className="h-full flex items-center justify-center p-2">
      <ChevronDown className="text-black" />
    </div>
  );
};
DropdownIndicator.displayName = "Select.DropdownIndicator";

const getIcon = (icon) => {
  const iconClass = { className: "text-black absolute ml-4" };

  if (icon === "location") return <MapPin {...iconClass} />;
  if (icon === "category") return <Package {...iconClass} />;
  return null;
};
