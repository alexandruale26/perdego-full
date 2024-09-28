import PropTypes from "prop-types";
import * as Input from "../ui/Input";
import { cn } from "../../utils/cn";
import LocationSelect from "../selectors/LocationSelect";
import Button from "../ui/Button";
import { Search } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";

const formItemLocationClass = { className: "w-full max-w-[350px]" };
const defaultValues = {
  search: "",
  location: "",
};

const SearchBar = ({ className, buttonStyling, options = {} }) => {
  const onSubmit = async (fields) => {
    console.log(fields);
  };

  const form = useForm({
    // resolver: zodResolver(newPostSchema),
    defaultValues,
  });

  return (
    <Form getFieldState={form.getFieldState}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-[1200px] flex mx-auto gap-2 px-6 pt-10",
          className,
        )}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input.Root clearField={() => form.resetField(field.name)}>
                  <div className="size-6 p-0 rounded-full absolute left-4 shrink-0 top-1/2 -translate-y-1/2">
                    <Search />
                  </div>

                  <Input.Field
                    name="search"
                    variant="search"
                    size="search"
                    placeholder="Cauți ceva anume?"
                    maxLength={50}
                    className={cn("w-full", {
                      "focus-visible:border-primary focus-visible:ring-primary":
                        options.darkFocus,
                    })}
                    {...field}
                  />
                </Input.Root>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem {...formItemLocationClass}>
              <FormControl>
                <LocationSelect
                  isClearable
                  usedInPostCreate={false}
                  options={{
                    darkFocus: options?.darkFocus ?? false,
                    darkBackground: true,
                    darkSelect: options?.darkSelect ?? false,
                    showSeparator: true,
                    icon: "location",
                  }}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={cn(
            "bg-white text-base text-black px-6 hover:bg-current",
            buttonStyling,
          )}
        >
          <span className="text-inherit">Cǎutare</span>
        </Button>
      </form>
    </Form>
  );
};
SearchBar.displayName = "SearchBar";
SearchBar.propTypes = {
  className: PropTypes.string,
  buttonStyling: PropTypes.string,
  options: PropTypes.shape({
    darkFocus: PropTypes.bool,
    darkSelect: PropTypes.bool,
  }),
};

export default SearchBar;
