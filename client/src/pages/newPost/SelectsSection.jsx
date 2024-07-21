import PropTypes from "prop-types";
import LocationSelect from "../../components/selectors/location/LocationSelect";
import CategorySelect from "../../components/selectors/category/CategorySelect";
import PostTypeSelect from "../../components/PostTypeSelect";
import {
  FormField,
  FormItem,
  FormControl,
  InputErrorMessage,
} from "../../components/ui/Form";

const SelectsSection = ({ formControl }) => {
  return (
    <section className="mt-5 ml-8 space-y-4">
      <PostTypeSelect formControl={formControl} className="max-w-[300px]" />

      <FormField
        control={formControl}
        name="category"
        render={({ field }) => (
          <FormItem className="max-w-[500px]">
            <p className="text-lg">Categorie obiect</p>
            <FormControl>
              <CategorySelect name="category" isInPostForm {...field} />
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formControl}
        name="location"
        render={({ field }) => (
          <FormItem className="max-w-[500px]">
            <p className="text-lg">Localitate</p>
            <FormControl>
              <LocationSelect name="location" isInPostForm {...field} />
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />
    </section>
  );
};
SelectsSection.displayName = "NewPost.SelectsSection";
SelectsSection.propTypes = {
  formControl: PropTypes.any.isRequired,
};

export default SelectsSection;
