import PropTypes from "prop-types";
import TabSelect from "../../../components/ui/TabSelect";

const tabsData = [
  {
    title: "Intrǎ în cont",
    linkTo: "/autentificare",
  },
  {
    title: "Creeazǎ un cont",
    linkTo: "/cont-nou",
  },
];

const AuthHeader = ({ defaultTab }) => {
  return <TabSelect tabs={tabsData} defaultTab={defaultTab} />;
};
AuthHeader.displayName = "AuthHeader";
AuthHeader.propTypes = { defaultTab: PropTypes.string.isRequired };

export default AuthHeader;
