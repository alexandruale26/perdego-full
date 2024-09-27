import { useRef } from "react";
import PropTypes from "prop-types";
import * as Input from "../ui/Input";
import { cn } from "../../utils/cn";
import LocationSelect from "../selectors/LocationSelect";
import Button from "../ui/Button";
import { Search } from "lucide-react";

const SearchBar = ({ className, buttonStyling }) => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());

    console.log(formObj);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-[1200px] flex mx-auto gap-2 px-6 pt-10",
        className,
      )}
    >
      <Input.Root addClear className="flex">
        <div className="size-6 p-0 rounded-full absolute left-4 shrink-0 top-1/2 -translate-y-1/2">
          <Search />
        </div>

        <Input.Field
          name="search"
          variant="search"
          size="search"
          placeholder="Cauți ceva anume?"
          maxLength={50}
        />
      </Input.Root>

      <div className="w-full max-w-[350px] h-14">
        <LocationSelect name="location" />
      </div>

      <Button
        type="submit"
        className={cn(
          "bg-white text-base text-black px-6 hover:bg-current",
          buttonStyling,
        )}
        onClick={handleSubmit}
      >
        <span className="text-inherit">Cǎutare</span>
      </Button>
    </form>
  );
};
SearchBar.displayName = "SearchBar";
SearchBar.propTypes = {
  className: PropTypes.string,
  buttonStyling: PropTypes.string,
};

export default SearchBar;
