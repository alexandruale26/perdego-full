import { useRef } from "react";
import * as Input from "../../components/ui/Input";
import LocationSelect from "../../components/locationSelect/LocationSelect";
import Button from "../../components/ui/Button";
import { Search } from "lucide-react";

// TODO: disable Search button in search bar

const SearchBar = () => {
  const formRef = useRef(null);

  const handleSubmit = () => {
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
          <Search width={20} height={20} />
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
        type="button"
        variant="iconText"
        size="iconText"
        className="bg-white text-base"
        onClick={handleSubmit}
      >
        <span className="text-black">Cǎutare</span>
        <Search />
      </Button>
    </form>
  );
};

export default SearchBar;
