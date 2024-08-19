import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import generateCrumbs from "./generateCrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";

const BreadrumbsNav = ({ crumbsExtension, className }) => {
  const location = useLocation();
  const paths = location.pathname.slice(1).split("/");

  const breadcrumbs = generateCrumbs(paths, crumbsExtension);

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
  crumbsExtension: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      crumb: PropTypes.string,
    }),
  ),
};

export default BreadrumbsNav;
