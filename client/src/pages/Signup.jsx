// import { useState } from "react";
// import * as Input from "../components/ui/input";
// import AuthHeader from "../components/authenticate/AuthHeader";
// import AuthFormBase from "../components/authenticate/AuthFormBase";
// import AuthButton from "../components/authenticate/AuthButton";
// import Button from "../components/ui/button";
// import AuthParagraph from "../components/authenticate/AuthParagraph";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   InputErrorMessage,
// } from "../components/ui/form";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signupSchema, defaultValues } from "../schemas/signupSchema.js";

// const Signup = () => {
//   const [onProfile, setOnProfile] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(signupSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   const {
//     watch,
//     formState: { errors },
//   } = form;

//   function onSubmit(values) {
//     console.log(values);
//   }

//   const accountFieldsNotEmpty =
//     watch("email").length > 0 &&
//     watch("password").length > 0 &&
//     watch("passwordConfirm").length > 0;

//   const accountFieldsValid =
//     errors["email"] == undefined &&
//     errors["password"] == undefined &&
//     errors["passwordConfirm"] == undefined;

//   const handleClickToProfile = () => {
//     if (accountFieldsNotEmpty && accountFieldsValid) setOnProfile(true);

//     // trigger error on fields with trigger
//   };

//   console.log(accountFieldsNotEmpty && accountFieldsValid);

//   return (
//     <div>
//       <AuthHeader defaultValue="cont-nou" />

//       <AuthParagraph className="text-md font-bold">
//         {onProfile ? "Profilul tǎu" : "Autentificare"}
//       </AuthParagraph>

//       <Form {...form}>
//         <AuthFormBase handleSubmit={form.handleSubmit(onSubmit)}>
//           {!onProfile ? (
//             <>
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot>
//                         <Input.Field
//                           placeholder="Adresa ta de e-mail"
//                           {...field}
//                         />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot addSensible>
//                         <Input.Field
//                           placeholder="Creeazǎ o parolǎ"
//                           {...field}
//                           type="password"
//                         />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="passwordConfirm"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot addSensible>
//                         <Input.Field
//                           placeholder="Confirmǎ parola"
//                           {...field}
//                           type="password"
//                         />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           ) : (
//             <>
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot>
//                         <Input.Field placeholder="Numele tǎu" {...field} />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot>
//                         <Input.Field placeholder="Locație" {...field} />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input.SuperRoot>
//                         <Input.Field
//                           placeholder="Numarul tǎu de telefon"
//                           {...field}
//                         />
//                       </Input.SuperRoot>
//                     </FormControl>
//                     <InputErrorMessage />
//                   </FormItem>
//                 )}
//               />
//             </>
//           )}

//           {onProfile ? (
//             <AuthButton title="Creeazǎ un cont" />
//           ) : (
//             <Button
//               type="button"
//               className="mx-10 my-8"
//               onClick={handleClickToProfile}
//             >
//               Continua cǎtre profil
//             </Button>
//           )}
//         </AuthFormBase>
//       </Form>
//     </div>
//   );
// };
// Signup.displayName = "Signup";

// export default Signup;

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Step 1 Schema
const step1Schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters long" }),
});

// Step 2 Schema
const step2Schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  location: z.string().min(1, { message: "Location is required" }),
});

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const methods = useForm({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (step === 2) {
      reset({ ...formData });
    }
  }, [step, reset, formData]);

  const onSubmit = (data) => {
    if (step === 1) {
      setFormData(data);
      setStep(2);
    } else {
      const finalData = { ...formData, ...data };
      console.log("Final data", finalData);
      // Handle final form submission here, e.g., send data to server
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <div>
              <label>Email</label>
              <input {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label>Password</label>
              <input type="password" {...register("password")} />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" {...register("confirmPassword")} />
              {errors.confirmPassword && (
                <p>{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label>Name</label>
              <input {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label>Phone</label>
              <input {...register("phone")} />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div>
              <label>Location</label>
              <input {...register("location")} />
              {errors.location && <p>{errors.location.message}</p>}
            </div>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
