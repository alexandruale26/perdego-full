import { useEffect } from "react";
import PropTypes from "prop-types";
import LocationSelect from "../../components/selectors/LocationSelect";
import CategorySelect from "../../components/selectors/CategorySelect";
import PostTypeSelect from "../../components/PostTypeSelect";
import * as Input from "../../components/ui/Input";
import Switch from "../../components/ui/Switch";
import {
  FormField,
  FormItem,
  FormControl,
  InputErrorMessage,
} from "../../components/ui/Form";

const SelectorsSection = ({ form: { formControl, getValues, resetField } }) => {
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
      <PostTypeSelect formControl={formControl} className="max-w-[300px]" />

      <FormField
        control={formControl}
        name="category"
        render={({ field }) => (
          <FormItem className="max-w-[500px]">
            <p className="text-xl">Categorie obiect</p>
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
            <p className="text-xl">Localitate</p>
            <FormControl>
              <LocationSelect name="location" isInPostForm {...field} />
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />

      {postType === "pierdute" ? (
        <FormField
          control={formControl}
          name="reward"
          render={({ field: { value, onChange } }) => (
            <FormItem className="max-w-[500px]">
              <p className="text-xl">Oferǎ recompensǎ</p>
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
            control={formControl}
            name="sendToAuthorities"
            render={({ field: { value, onChange } }) => (
              <FormItem className="max-w-[500px]">
                <p className="text-xl">Obiect predat autoritǎților</p>
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
              control={formControl}
              name="authorities"
              render={({ field }) => (
                <FormItem className="max-w-[500px]">
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
    formControl: PropTypes.func,
    getValues: PropTypes.func,
    resetField: PropTypes.func,
  }).isRequired,
};

export default SelectorsSection;
