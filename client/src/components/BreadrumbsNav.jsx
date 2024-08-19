import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadrumbs/Breadcrumb";
import { Fragment } from "react";

const BreadrumbsNav = ({ crumbsExtension, className }) => {
  const location = useLocation();
  const paths = location.pathname.slice(1).split("/");

  const generateCrumbs = () => {
    let baseBreadcrumbs = [];

    if (paths[0] === "anunturi") {
      let baseUrl = "/anunturi";

      baseBreadcrumbs = paths.reduce((acc, path) => {
        if (path === "anunturi") {
          acc.push({ url: baseUrl, crumb: "Anunțuri" });
        } else if (path === "nou") {
          baseUrl += "/nou";
          acc.push({ url: baseUrl, crumb: "Anunț nou" });
        }

        return acc;
      }, []);

      let additionalCrumbs = [];

      if (crumbsExtension) {
        baseUrl += "?";
        additionalCrumbs = crumbsExtension.reduce((acc, path, i) => {
          if (i === 0) {
            baseUrl += path.url;
            acc.push({ url: baseUrl, crumb: path.crumb });
          } else if (path.url === "") {
            acc.push({ url: "/", crumb: path.crumb });
          } else {
            baseUrl += `&${path.url}`;
            acc.push({ url: baseUrl, crumb: path.crumb });
          }

          return acc;
        }, []);

        baseBreadcrumbs.push(...additionalCrumbs);
      }
    }

    return baseBreadcrumbs;
  };

  const breadcrumbs = generateCrumbs();

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
