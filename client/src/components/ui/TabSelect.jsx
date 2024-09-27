import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const TabSelect = ({
  className,
  tabs = undefined,
  defaultTab = undefined,
  ...props
}) => {
  return (
    <ul
      className={cn(
        "w-full h-14 flex items-start border-b border-b-primary",
        className,
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <TabItem
          key={tab.linkTo}
          tab={tab}
          className={defaultTab === tab.linkTo ? "border-b-4" : ""}
        />
      ))}
    </ul>
  );
};
TabSelect.displayName = "TabSelect";
TabSelect.propTypes = {
  className: PropTypes.string,
  defaultTab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      linkTo: PropTypes.string.isRequired,
    }),
  ),
};

const TabItem = ({ tab, className }) => {
  return (
    <li
      className={cn("flex w-full h-full text-xl border-b-primary", className)}
    >
      <Link
        to={tab.linkTo}
        className="w-full h-full px-1 focus-visible:outline-secondary"
      >
        {tab.title}
      </Link>
    </li>
  );
};
TabItem.displayName = "TabSelect.TabItem";
TabItem.propTypes = {
  className: PropTypes.string,
  tab: PropTypes.shape({
    title: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
};

export default TabSelect;
