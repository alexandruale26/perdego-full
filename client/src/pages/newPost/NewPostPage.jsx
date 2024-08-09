import SectionCard from "../../components/SectionCard";
import Button from "../../components/ui/Button";
import ImageSelect from "../../components/selectors/image/ImageSelect";
import ContactSection from "./ContactSection";
import SelectsSection from "./SelectsSection";
import { Form, FormField, FormItem } from "../../components/ui/Form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, newPostSchema } from "../../schemas/newPostSchema";
import InfosSection from "./InfosSection";
import { deleteImage } from "../../services/imageApi";
import uploadImage from "./imageUploader";
import { api } from "../../services/api";

// TODO: alert if user refreshes or closes this page (beforeunloading event)
// TODO - focus styling on normal inputs, textarea, image, category, buttons
const NewPostPage = () => {
  const form = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (fields) => {
    console.log(fields);
    let imagePath = null;

    if (fields.image) {
      try {
        const { success, data } = await uploadImage(fields.image);

        if (success === false) throw new Error(data);
        imagePath = data;
      } catch ({ message }) {
        return console.log(message); // user notification
      }
    }

    try {
      const response = await api.post("/posts", {
        ...fields,
        image: imagePath,
      });

      if (response?.data?.status !== "success") {
        await deleteImage(imagePath);
        throw new Error(response.message);
      }
    } catch ({ message }) {
      console.log(message); // user notification or 404
    }
  };

  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <div>
        <h3 className="text-lg text-primary font-bold">Publicǎ un anunț</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <SelectsSection formControl={form.control} />
            <InfosSection formControl={form.control} />

            <SectionCard>
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <p className="text-lg">Imagine</p>
                    <ImageSelect onChange={onChange} {...rest} />
                  </FormItem>
                )}
              />
            </SectionCard>

            <ContactSection formControl={form.control} />
            <Button className="w-full max-w-[320px] self-center">
              Publicǎ anunțul
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};
NewPostPage.displayName = "NewPost";

export default NewPostPage;
