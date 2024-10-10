import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BreadrumbsNav from "../../components/breadrumbs/BreadrumbsNav";
import SectionCard from "../../components/SectionCard";
import SearchBar from "../../components/search/SearchBar";
import categories from "../../sharedData/categories";
import counties from "../../sharedData/counties";
import cities from "../../sharedData/cities";
import defaultValues from "../../sharedData/searchDefaultValues";

const PostsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterValues, setFilterValues] = useState(defaultValues);
  const [searchParams] = useSearchParams();

  // TODO: make validations for when get searchParams from url to location, type, category
  useEffect(() => {
    const searchFields = Array.from(searchParams.entries());

    // TODO: what to do on throw???
    const xx = searchFields.reduce(
      (acc, [name, value]) => {
        const trimmedName = name.trim();
        const trimmedValue = value.trim();

        if (trimmedName === "type") {
          if (trimmedValue === "pierdute" || trimmedValue === "gasite") {
            acc[trimmedName] = trimmedValue;
          } else {
            throw new Error(`type is invalid: ${value}`);
          }
        } else if (trimmedName === "location") {
          let location = counties.find((item) => item === trimmedValue);
          if (!location) {
            location = cities.find((item) => item === trimmedValue);
          }
          if (!location) throw new Error(`location is invalid: ${value}`);
          acc[trimmedName] = trimmedValue;
        } else if (trimmedName === "category") {
          const category = categories.find(
            (item) => item.value === trimmedValue,
          );
          if (!category) throw new Error(`category is invalid: ${value}`);
          acc[trimmedName] = trimmedValue;
        } else if (trimmedName === "search") {
          if (trimmedValue.length < 3)
            throw new Error(`search is invalid -> min 3 characters: ${value}`);
          acc[trimmedName] = trimmedValue;
        }
        return acc;
      },
      { ...defaultValues },
    );

    setFilterValues(xx);
    setIsLoading(false);
  }, []);

  return !isLoading ? (
    <main className="max-w-[1200px] my-10 px-6 mx-auto flex flex-col gap-8">
      <BreadrumbsNav />
      <SectionCard>
        <SearchBar
          filterValues={filterValues}
          setFilterValues={setFilterValues}
        />
      </SectionCard>
    </main>
  ) : (
    "Loading...."
  );
};
PostsPage.displayName = "PostsPage";

export default PostsPage;
