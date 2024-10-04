export const parseCity = (location) => {
  let name = "";
  let commune = "";
  let county = "";

  const parts = location.split("-j_");
  if (parts.length > 0) {
    let nameAndCommune = parts[0];
    const communeIndex = nameAndCommune.lastIndexOf("-c_");

    if (communeIndex !== -1) {
      commune = nameAndCommune.substring(communeIndex + 3);
      name = nameAndCommune.substring(0, communeIndex);
    } else {
      name = nameAndCommune;
    }

    name = replaceDashAndPlus(name);
    commune = replaceDashAndPlus(commune);
  }

  county = replaceDashAndPlus(parts[1]);

  return { name, commune, county, label: name, value: location };
};

export const sortCities = (a, b) => {
  return a.label.length - b.label.length || a.county.localeCompare(b.county);
};

export const parseCounty = (location) => {
  const label = replaceDashAndPlus(location.split("-j_")[1]);

  return { label, value: location };
};

const replaceDashAndPlus = (string) =>
  string.replace(/-/g, " ").replace(/\+/g, "-");
