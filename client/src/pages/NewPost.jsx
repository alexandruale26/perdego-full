import * as Input from "../components/ui/input/Input";
import * as Selector from "../components/ui/Selector";

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

const NewPost = () => {
  const form = useForm({
    // resolver: zodResolver({})
    defaultValues: { category: "pierdute" },
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
            {/* CATETORIE ANUNT */}
            <div>
              <Selector.Group defaultValue={"Pierdute"}>
                <Selector.Item value={"Pierdute"}>
                  <FormField
                    control={form.control}
                    name="category"
                    id="pierdute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pierdute</FormLabel>
                        <FormControl>
                          <Input.SuperRoot>
                            <Input.Field
                              type="radio"
                              placeholder="Adresa ta de e-mail"
                              {...field}
                            />
                          </Input.SuperRoot>
                        </FormControl>
                        <InputErrorMessage />
                      </FormItem>
                    )}
                  />
                </Selector.Item>
                <Selector.Item value={"Gǎsite"}>
                  <FormField
                    control={form.control}
                    name="category"
                    id="gasite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gǎsite</FormLabel>
                        <FormControl>
                          <Input.SuperRoot>
                            <Input.Field
                              type="radio"
                              placeholder="Adresa ta de e-mail"
                              {...field}
                            />
                          </Input.SuperRoot>
                        </FormControl>
                        <InputErrorMessage />
                      </FormItem>
                    )}
                  />
                </Selector.Item>
              </Selector.Group>
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
