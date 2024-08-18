import PropTypes from "prop-types";
import SectionCard from "../../components/SectionCard";
import * as Input from "../../components/ui/Input";
import * as Textarea from "../../components/ui/Textarea";
import {
  FormField,
  FormItem,
  FormControl,
  InputErrorMessage,
} from "../../components/ui/Form";

const InfosSection = ({ formControl }) => {
  return (
    <>
      <SectionCard>
        <FormField
          control={formControl}
          name="title"
          render={({ field }) => (
            <FormItem>
              <p className="text-xl">Titlu</p>
              <FormControl>
                <Input.SuperRoot>
                  <Input.Field
                    placeholder="Adaugǎ un titlu descriptiv"
                    {...field}
                  />
                </Input.SuperRoot>
              </FormControl>
              <InputErrorMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formControl}
          name="description"
          render={({ field }) => (
            <FormItem>
              <p className="text-xl">Descriere</p>
              <FormControl>
                <Textarea.Root>
                  <Textarea.Field
                    placeholder="Oferǎ cât mai multe detalii"
                    {...field}
                  />
                </Textarea.Root>
              </FormControl>
              <InputErrorMessage />
            </FormItem>
          )}
        />
      </SectionCard>
    </>
  );
};
InfosSection.displayName = "NewPost.InfosSection";
InfosSection.propTypes = {
  formControl: PropTypes.any.isRequired,
};

export default InfosSection;
