import PropTypes from "prop-types";
import * as Input from "../ui/Input";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import { Pencil, Search } from "lucide-react";
import LocationSelect from "../selectors/LocationSelect";
import PostTypeSelect from "../selectors/PostTypeSelect";
import CategorySelect from "../selectors/CategorySelect";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";

const defaultValues = {
  search: "",
  location: "",
  type: "gasite",
  category: "",
};

// TODO: make validations for when get searchParams from url to location, type, category
const SearchBar = ({ className }) => {
  const onSubmit = async (fields) => {
    console.log(fields);
  };

  const form = useForm({
    // resolver: zodResolver(newPostSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-[1200px] flex mx-auto gap-4 flex-col",
          className,
        )}
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input.Root clearField={() => form.resetField(field.name)}>
                    <div className="size-6 p-0 rounded-full absolute left-4 shrink-0 top-1/2 -translate-y-1/2">
                      <Pencil />
                    </div>

                    <Input.Field
                      name="search"
                      placeholder="Cauți ceva anume?"
                      className="bg-grey-6 px-12"
                      maxLength={50}
                      {...field}
                    />
                  </Input.Root>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="gap-3 w-full max-w-[300px] text-lg font-semibold"
          >
            <Search />
            <span className="text-inherit">Cǎutare</span>
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="w-full flex gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <LocationSelect
                      isClearable
                      usedInPostCreate={false}
                      options={getSelectorOptions("location")}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <CategorySelect
                    isClearable
                    usedInPostCreate={false}
                    options={getSelectorOptions("category")}
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-auto">
            <div className="w-[300px]">
              <PostTypeSelect
                formControl={form.control}
                showLabel={false}
                defaultValue={form.formState.defaultValues.type}
              />
            </div>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="ghost"
            className="text-lg font-semibold px-4 h-12"
            onClick={() => {
              form.reset();
            }}
          >
            Şterge filtrele
          </Button>
        </div>
      </form>
    </Form>
  );
};
SearchBar.displayName = "SearchBar";
SearchBar.propTypes = { className: PropTypes.string };

export default SearchBar;

const getSelectorOptions = (icon) => ({
  darkBackground: true,
  showSeparator: true,
  icon,
});
