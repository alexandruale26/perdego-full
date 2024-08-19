const generateCrumbs = (paths, crumbsExtension) => {
  let baseBreadcrumbs = [];

  // POSTS
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

export default generateCrumbs;
