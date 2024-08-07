import { useRef } from "react";
import * as Input from "../../components/ui/Input";
import LocationSelect from "../../components/selectors/location/LocationSelect";
import Button from "../../components/ui/Button";
import { Search } from "lucide-react";

// TODO: disable Search button in search bar on Posts page

const SearchBar = () => {
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
      className={"w-full max-w-[1200px] flex mx-auto gap-2 px-10 pt-4"}
    >
      <Input.Root addClear className="flex">
        <div className="size-5 p-0 rounded-full absolute inset-y-0 left-4 shrink-0 top-1/2 -translate-y-1/2">
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
        className="bg-white text-base px-6 hover:bg-current"
        onClick={handleSubmit}
      >
        <span className="text-black">Cǎutare</span>
      </Button>
    </form>
  );
};

export default SearchBar;
