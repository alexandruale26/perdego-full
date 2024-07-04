import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
AppLayout.displayName = "AppLayout";
AppLayout.propTypes = { children: PropTypes.node };

export default AppLayout;
