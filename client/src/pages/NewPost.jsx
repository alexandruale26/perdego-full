import { useState, forwardRef } from "react";
import * as Input from "../components/ui/input/Input";
import RadioSelector from "../components/RadioSelector";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  InputErrorMessage,
} from "../components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const typeSchema = z.object({
  type: z.enum(["pierdute", "gasite"], {
    required_error: "Tip anunt.",
  }),
});

const NewPost = () => {
  const form = useForm({
    resolver: zodResolver(typeSchema),
    defaultValues: { type: "pierdute" },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <main className="max-w-[1200px] my-10 px-6 mx-auto">
      <section>
        <h3 className="text-lg text-primary font-bold">Publicǎ un anunț</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <RadioSelector formControl={form.control} className="w-[200px]" />
            </div>
            <button className="mt-40">Submit</button>
          </form>
        </Form>
      </section>
    </main>
  );
};
NewPost.displayName = "NewPost";

export default NewPost;
