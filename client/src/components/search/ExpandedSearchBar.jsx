import PropTypes from "prop-types";
import * as Input from "../ui/Input";
import { cn } from "../../utils/cn";
import LocationSelect from "../selectors/LocationSelect";
import Button from "../ui/Button";
import { Pencil, Search } from "lucide-react";
import PostTypeSelect from "../selectors/PostTypeSelect";
import CategorySelect from "../selectors/CategorySelect";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";

const formItemClass = { className: "w-full max-w-[400px]" };
const defaultValues = {
  search: "",
  type: "gasite",
  category: "",
  location: "",
};

// TODO: make validations for when get searchParams from url to location, type, category
const ExpandedSearchBar = ({ className }) => {
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
          "w-full max-w-[1200px] flex mx-auto gap-6 flex-col",
          className,
        )}
      >
        <div className="flex gap-2">
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
                      variant="search"
                      size="search"
                      placeholder="Cauți ceva anume?"
                      maxLength={50}
                      className="focus-visible:border-primary focus-visible:ring-primary"
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
              <FormItem {...formItemClass}>
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
        </div>

        <div className="flex gap-2 justify-between">
          <div className="w-full max-w-[250px]">
            <PostTypeSelect
              formControl={form.control}
              showLabel={false}
              defaultValue={form.formState.defaultValues.type}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem {...formItemClass}>
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

        <div className="flex gap-8">
          <Button
            type="submit"
            className="gap-3 w-full max-w-[250px] text-lg font-semibold"
          >
            <Search />
            <span className="text-inherit">Cǎutare</span>
          </Button>

          <Button variant="ghost" className="text-lg font-semibold px-8">
            Şterge filtrele
          </Button>
        </div>
      </form>
    </Form>
  );
};
ExpandedSearchBar.displayName = "ExpandedSearchBar";
ExpandedSearchBar.propTypes = { className: PropTypes.string };

export default ExpandedSearchBar;

const getSelectorOptions = (icon) => ({
  darkFocus: true,
  darkBackground: true,
  darkSelect: true,
  showSeparator: true,
  icon,
});
