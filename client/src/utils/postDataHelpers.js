import categories from "../sharedData/categories";
import { parseLocation } from "./citiesHelpers";

export const getTypeLabel = (string) => {
  return string === "gasite" ? "Gǎsite" : "Pierdute";
};

export const getCategoryLabel = (string) => {
  return categories.filter((item) => item.value === string)[0].label;
};

export const getLocationLabel = (string) => {
  const location = parseLocation(string);
  return location.commune
    ? `${location.name}, comuna ${location.commune}, județul ${location.county}`
    : `${location.name}, județul ${location.county}`;
};
