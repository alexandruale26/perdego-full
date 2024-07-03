import { useState, forwardRef } from "react";
import * as Input from "../../components/ui/Input";
import PostTypeSelect from "../../components/PostTypeSelect";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";

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
                className="w-[200px]"
              />
            </section>

            {/* TITLU - DESCRIERE ANUNT */}
            <section className="p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
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
                      <Textarea
                        placeholder="Oferǎ cât mai multe detalii"
                        {...field}
                      />
                    </FormControl>
                    <InputErrorMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* IMAGINE - CATEGORIE */}
            <div className="h-[540px] w-full flex gap-6">
              <section className="h-full w-full p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagine</FormLabel>
                      <FormControl></FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className="h-full w-full p-8 border border-grey-6 rounded-lg shadow-xl space-y-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorie obiect</FormLabel>
                      <FormControl></FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              </section>
            </div>

            {/* LOCATIE - CONTACT */}
            <div className="h-[370px] w-full flex gap-6">
              <section className="h-full w-full p-8 border border-grey-6 rounded-lg shadow-md space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localitate</FormLabel>
                      <FormControl></FormControl>
                      <InputErrorMessage />
                    </FormItem>
                  )}
                />
              </section>
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
            </div>

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
