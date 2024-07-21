import PropTypes from "prop-types";
import FormCard from "./FormCard";
import * as Input from "../../components/ui/Input";
import {
  FormField,
  FormItem,
  FormControl,
  InputErrorMessage,
} from "../../components/ui/Form";

const ContactSection = ({ formControl }) => {
  return (
    <FormCard>
      <p className="text-lg">Informații de contact</p>
      <FormField
        control={formControl}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input.SuperRoot>
                <Input.Field placeholder="Nume" {...field} />
              </Input.SuperRoot>
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />
      <FormField
        control={formControl}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input.SuperRoot>
                <Input.Field placeholder="Telefon" {...field} />
              </Input.SuperRoot>
            </FormControl>
            <InputErrorMessage />
          </FormItem>
        )}
      />
    </FormCard>
  );
};
ContactSection.displayName = "NewPost.ContactSection";
ContactSection.propTypes = {
  formControl: PropTypes.any.isRequired,
};

export default ContactSection;
