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

const NewPostPage = () => {
  const form = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
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
