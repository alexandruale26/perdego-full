import { useState, forwardRef } from "react";
import * as Input from "../components/ui/input/Input";

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

const options = [
  { label: "Pierdute", value: "pierdute" },
  { label: "Găsite", value: "gasite" },
];

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
            {/* CATETgORIE ANUNT */}
            <div>
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
            </div>
            <button className="mt-40">Submit</button>
          </form>
        </Form>
      </section>
      <Selector options={options} />
    </main>
  );
};
NewPost.displayName = "NewPost";

export default NewPost;

const Selector = forwardRef(({ options }, ref) => {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full">
      <div className="flex w-full justify-around">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option.value)}
            className={`px-4 py-2 focus:outline-none ${
              selected === option.value ? "text-black" : "text-gray-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="relative w-full h-1 bg-gray-200">
        <div
          className="absolute top-0 h-1 transition-all duration-300 ease-in-out bg-green-900"
          style={{
            width: `${100 / options.length}%`,
            left: `${(100 / options.length) * options.findIndex((opt) => opt.value === selected)}%`,
          }}
        ></div>
      </div>
    </div>
  );
});
Selector.displayName = "Selector";
