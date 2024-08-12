import { useState } from "react";
import SectionCard from "../../components/SectionCard";
import Button from "../../components/ui/Button";
import ImageSelect from "../../components/selectors/image/ImageSelect";
import ContactSection from "./ContactSection";
import SelectorsSection from "./SelectorsSection";
import { Form, FormField, FormItem } from "../../components/ui/Form";
import Spinner from "../../components/ui/Spinner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValues, newPostSchema } from "../../schemas/newPostSchema";
import InfosSection from "./InfosSection";
import { deleteImage } from "../../services/imageApi";
import uploadImage from "./imageUploader";
import { api } from "../../services/api";

// TODO: alert if user refreshes or closes this page (beforeunloading event)
// TODO - focus styling on normal inputs, textarea, image, category, buttons
// TODO: Disable submit button, or modal and redirect to my posts
const NewPostPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (fields) => {
    console.log(fields);

    try {
      let imagePath = null;
      setIsLoading(true);

      if (fields.image) {
        const { success, data } = await uploadImage(fields.image);

        if (success === false) throw new Error(data);
        imagePath = data;
      }

      const { data } = await api.post("/posts", {
        ...fields,
        image: imagePath,
      });

      console.log(data);

      if (data.status !== "success") {
        await deleteImage(imagePath); // TODO: Admin access only to .env to delete files
        throw new Error(data.message);
      }

      setIsLoading(false); // ! redirectionare myPosts
    } catch ({ message }) {
      setIsLoading(false);
      console.log(message); // ! user notification or 404
    }
  };
  // TODO: maybe a main component for all
  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <div>
        <h3 className="text-lg text-primary font-bold">Publicǎ un anunț</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <SelectorsSection formControl={form.control} />
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
            <Button
              disabled={isLoading}
              className="w-full max-w-[320px] gap-4 self-center"
            >
              {isLoading ? (
                <>
                  Se proceseazǎ
                  <Spinner className="text-white" />
                </>
              ) : (
                "Publicǎ anunțul"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};
NewPostPage.displayName = "NewPost";

export default NewPostPage;
