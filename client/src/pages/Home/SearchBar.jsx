import { Link } from "react-router-dom";
import * as Input from "../../components/ui/input/Input";
import Button from "../../components/ui/Button";
import { Search } from "lucide-react";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"w-full max-w-[1000px] flex mx-auto gap-2 px-10 pt-4"}
    >
      <Input.Root addClear className="flex">
        <div className="size-5 p-0 rounded-full absolute inset-y-0 left-4 shrink-0 top-1/2 -translate-y-1/2">
          <Search width={20} height={20} />
        </div>

        <Input.Field
          id="search"
          variant="search"
          size="search"
          placeholder="Cauți ceva anume?"
          maxLength={50}
        />
      </Input.Root>

      <Input.Root addClear className="max-w-[250px]">
        <Input.Field
          id="location"
          variant="search"
          size="search"
          placeholder="Locație"
        />
      </Input.Root>

      <Button
        variant="iconText"
        size="iconText"
        className="bg-grey-6 text-base"
        asChild
      >
        <Link to="/anunturi">
          <span className="text-black">Cǎutare</span>
          <Search />
        </Link>
      </Button>
    </form>
  );
};

export default SearchBar;
