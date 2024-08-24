import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
AppLayout.displayName = "AppLayout";
AppLayout.propTypes = { children: PropTypes.node };

export default AppLayout;
