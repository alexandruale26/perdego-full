import * as Input from "../../components/ui/Input";
import * as Textarea from "../../components/ui/Textarea";
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
  type: z.enum(["pierdute", "gasite"], {
    required_error: "Tip anunt.",
  }),
});

const defaultValues = { type: "pierdute", title: "", description: "" };

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
            {/* CATEGORIE ANUNT */}
            <section className="mt-5 ml-8">
              <PostTypeSelect
                formControl={form.control}
                className="w-[300px]"
              />
            </section>

            {/* CATEGORIE OBIECT */}
            <section className="mt-5 ml-8 max-w-[500px]">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categorie obiect</FormLabel>
                    <FormControl>
                      <CategorySelect name="category" isForm />
                    </FormControl>
                    <InputErrorMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* LOCATIE */}
            <section className="mt-5 ml-8 max-w-[500px]">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localitate</FormLabel>
                    <FormControl>
                      <LocationSelect name="location" isForm />
                    </FormControl>
                    <InputErrorMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* TITLU - DESCRIERE ANUNT */}
            <section className="w-full p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titlu</FormLabel>
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
                    <FormLabel>Descriere</FormLabel>
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
            </section>

            {/* IMAGINE */}
            <div className="w-full flex gap-6">
              <section className="h-full w-full p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagine</FormLabel>
                      <FormControl>
                        <ImageSelect
                          className="max-w-[450px]"
                          onImageSelect={() => console.log("image selected")}
                        />
                      </FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              </section>
            </div>

            {/* CONTACT */}
            <section className="h-full w-full p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
              <FormLabel>Informații de contact</FormLabel>
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
            </section>

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
