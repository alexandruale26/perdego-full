import PropTypes from "prop-types";
import * as Input from "../ui/Input";
import { cn } from "../../utils/cn";
import LocationSelect from "../selectors/LocationSelect";
import Button from "../ui/Button";
import { Search } from "lucide-react";
import PostTypeSelect from "../selectors/PostTypeSelect";
import CategorySelect from "../selectors/CategorySelect";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/Form";

const formItemClass = { className: "max-w-[500px]" };
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
    <Form getFieldState={form.getFieldState}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full max-w-[1200px] flex mx-auto gap-2 flex-col",
          className,
        )}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
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

        <PostTypeSelect
          formControl={form.control}
          showLabel={false}
          defaultValue={form.formState.defaultValues.type}
          className="max-w-[250px]"
        />

        <Button type="submit">
          <span className="text-inherit">Cǎutare</span>
        </Button>
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
