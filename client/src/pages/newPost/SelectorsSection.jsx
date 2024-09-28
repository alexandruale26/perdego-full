import { useEffect } from "react";
import PropTypes from "prop-types";
import LocationSelect from "../../components/selectors/LocationSelect";
import CategorySelect from "../../components/selectors/CategorySelect";
import PostTypeSelect from "../../components/selectors/PostTypeSelect";
import * as Input from "../../components/ui/Input";
import Switch from "../../components/ui/Switch";
import {
  FormField,
  FormItem,
  FormControl,
  InputErrorMessage,
} from "../../components/ui/Form";

const formItemClass = { className: "max-w-[500px]" };
const paragraphClass = { className: "text-xl" };

const SelectorsSection = ({ form: { control, getValues, resetField } }) => {
  const postType = getValues("type");

  useEffect(() => {
    if (postType === "pierdute") {
      resetField("authorities");
      resetField("sendToAuthorities");
    } else {
      resetField("reward");
    }
  }, [postType]);

  return (
    <section className="mt-5 ml-8 space-y-4">
      <PostTypeSelect formControl={control} className="max-w-[250px]" />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem {...formItemClass}>
            <p {...paragraphClass}>Categorie obiect</p>
            <FormControl>
              <CategorySelect
                isClearable={false}
                usedInPostCreate
                options={getSelectorOptions()}
                {...field}
              />
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem {...formItemClass}>
            <p {...paragraphClass}>Localitate</p>
            <FormControl>
              <LocationSelect
                isClearable={false}
                usedInPostCreate
                options={getSelectorOptions()}
                {...field}
              />
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />

      {postType === "pierdute" ? (
        <FormField
          control={control}
          name="reward"
          render={({ field: { value, onChange } }) => (
            <FormItem {...formItemClass}>
              <p {...paragraphClass}>Oferǎ recompensǎ</p>
              <FormControl>
                <Switch checked={value} onCheckedChange={onChange} />
              </FormControl>
              <InputErrorMessage />
            </FormItem>
          )}
        />
      ) : (
        <>
          <FormField
            control={control}
            name="sendToAuthorities"
            render={({ field: { value, onChange } }) => (
              <FormItem {...formItemClass}>
                <p {...paragraphClass}>Obiect predat autoritǎților</p>
                <FormControl>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => {
                      resetField("authorities");
                      onChange(checked);
                    }}
                  />
                </FormControl>
                <InputErrorMessage />
              </FormItem>
            )}
          />
          {getValues("sendToAuthorities") ? (
            <FormField
              control={control}
              name="authorities"
              render={({ field }) => (
                <FormItem {...formItemClass}>
                  <FormControl>
                    <Input.SuperRoot>
                      <Input.Field
                        placeholder="Nume secție de poliție"
                        {...field}
                      />
                    </Input.SuperRoot>
                  </FormControl>
                  <InputErrorMessage />
                </FormItem>
              )}
            />
          ) : null}
        </>
      )}
    </section>
  );
};
SelectorsSection.displayName = "NewPost.SelectorsSection";
SelectorsSection.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object,
    getValues: PropTypes.func,
    resetField: PropTypes.func,
  }).isRequired,
};

export default SelectorsSection;

const getSelectorOptions = () => ({
  darkBackground: false,
  showSeparator: false,
  icon: null,
});
