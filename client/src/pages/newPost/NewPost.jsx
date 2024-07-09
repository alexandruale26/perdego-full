import * as Input from "../../components/ui/Input";
import * as Textarea from "../../components/ui/Textarea";
import Section from "./Section";
import PostTypeSelect from "../../components/PostTypeSelect";
import Button from "../../components/ui/Button";
import LocationSelect from "../../components/selectors/location/LocationSelect";
import CategorySelect from "../../components/selectors/category/CategorySelect";
import ImageSelect from "../../components/selectors/image/ImageSelect";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  InputErrorMessage,
} from "../../components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const typeSchema = z.object({
  // TODO: manage this on backend
  type: z.enum(["pierdute", "gasite"], {
    required_error: "Alege tipul de anunț",
  }),
  category: z.string({ required_error: "Alege o categorie" }),
  location: z.string({ required_error: "Alege o localitate" }),
  image: z.any(),
});

const defaultValues = {
  type: "pierdute",
  title: "",
  category: undefined,
  description: undefined,
  location: undefined,
  image: undefined,
};

const NewPost = () => {
  const form = useForm({
    resolver: zodResolver(typeSchema),
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
            <section className="mt-5 ml-8 space-y-4">
              {/* CATEGORIE ANUNT */}
              <PostTypeSelect
                formControl={form.control}
                className="max-w-[300px]"
              />

              {/* CATEGORIE OBIECT */}
              <FormField
                control={form.control}
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

              {/* LOCATIE */}
              <FormField
                control={form.control}
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

            {/* TITLU - DESCRIERE ANUNT */}
            <Section>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-lg">Titlu</p>
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
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-lg">Descriere</p>
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
            </Section>

            {/* IMAGINE */}
            <Section>
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
            </Section>

            {/* CONTACT */}
            <Section>
              <p className="text-lg">Informații de contact</p>
              <FormField
                control={form.control}
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
                control={form.control}
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
            </Section>

            <Button className="w-full max-w-[320px] self-center">
              Publicǎ anunțul
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};
NewPost.displayName = "NewPost";

// TODO: inputErrorMessage, Location, Category, Image, better organized sections

export default NewPost;
