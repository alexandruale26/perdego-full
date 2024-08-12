import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};
AppLayout.displayName = "AppLayout";
AppLayout.propTypes = { children: PropTypes.node };

export default AppLayout;
