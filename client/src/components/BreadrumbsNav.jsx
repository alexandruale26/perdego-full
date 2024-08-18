import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/Breadcrumb";
import { Fragment } from "react";

const BreadrumbsNav = ({ crumbsExtensions, className }) => {
  const location = useLocation();
  const paths = location.pathname.slice(1).split("/");

  const breadcrumbs = paths.reduce((acc, path) => {
    if (paths[0] === "anunturi") {
      if (path === "anunturi")
        acc.push({ url: "/anunturi", crumb: "Anunțuri" });
      else if (path === "nou") {
        acc.push({ url: "/anunturi/nou", crumb: "Anunț nou" });
      }
    }
    return acc;
  }, []);

  console.log(breadcrumbs);

  return (
    <Breadcrumb>
      <BreadcrumbList className={className}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Acasǎ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((item, i) => {
          return (
            <Fragment key={item.url}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {i < breadcrumbs.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.url}>{item.crumb}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.crumb}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
BreadrumbsNav.displayName = "BreadrumbsNav";
BreadrumbsNav.propTypes = {
  className: PropTypes.string,
  crumbsExtensions: PropTypes.string,
};

export default BreadrumbsNav;
