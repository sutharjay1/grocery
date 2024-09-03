// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { z } from "zod";
// import Stepper from "../../components/ui/stepper";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Loader2 } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from "@/components/ui/card";

// const schema = z
//   .object({
//     name: z.string().nonempty("First name is required"),
//     mobileNumber: z.string().nonempty("Mobile number is required"),
//     otp: z
//       .string()
//       .length(6, "OTP must be 6 digits")
//       .nonempty("OTP is required"),
//     email: z
//       .string()
//       .email("Invalid email address")
//       .nonempty("Email is required"),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters long")
//       .nonempty("Password is required"),
//     confirmPassword: z.string().nonempty("Confirm Password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export default function MultiStepForm() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       mobileNumber: "",
//       otp: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const steps = ["Personal Info", "OTP Verification", "Account Details"];

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     console.log(data);
//     setIsSubmitting(false);
//     // Move to next step or finish the form
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Handle form completion (e.g., show success message, redirect)
//       console.log("Form submitted successfully!");
//     }
//   };

//   return (
//     <section className="bg-white">
//       <div className="flex min-h-screen w-full place-items-center lg:grid lg:grid-cols-12">
//         <section className="relative hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:flex lg:h-full xl:col-span-6">
//           <img
//             alt="Decorative background image"
//             src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
//             className="absolute inset-0 h-full w-full object-cover opacity-80"
//           />
//           <div className="hidden lg:relative lg:block lg:p-12">
//             <a className="block text-white" href="/">
//               <span className="sr-only">Home</span>
//               <svg
//                 className="h-8 sm:h-10"
//                 viewBox="0 0 28 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 {/* SVG Path */}
//               </svg>
//             </a>
//             <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
//               Welcome to Squid 🦑
//             </h2>
//             <p className="mt-4 leading-relaxed text-white/90">
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
//               nam dolorum aliquam, quibusdam aperiam voluptatum.
//             </p>
//           </div>
//         </section>
//         <Card className="mx-auto flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
//           <div className="mx-auto w-full max-w-3xl">
//             <CardHeader className="px-2 py-0">
//               <Stepper
//                 steps={steps}
//                 currentStep={currentStep}
//                 setCurrentStep={setCurrentStep}
//               />
//             </CardHeader>
//             <Form {...form}>
//               <form
//                 className="mt-8 space-y-6"
//                 onSubmit={form.handleSubmit(onSubmit)}
//               >
//                 <CardContent className="px-2 py-0">
//                   {currentStep === 0 && (
//                     <>
//                       <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Name"
//                                 className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="mobileNumber"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Mobile Number"
//                                 className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </>
//                   )}

//                   {currentStep === 1 && (
//                     <FormField
//                       control={form.control}
//                       name="otp"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormControl>
//                             <InputOTP
//                               maxLength={6}
//                               render={({ slots }) => (
//                                 <>
//                                   <InputOTPGroup>
//                                     {slots.slice(0, 3).map((slot, index) => (
//                                       <InputOTPSlot key={index} {...slot} />
//                                     ))}
//                                   </InputOTPGroup>
//                                   <InputOTPSeparator />
//                                   <InputOTPGroup>
//                                     {slots.slice(3).map((slot, index) => (
//                                       <InputOTPSlot key={index + 3} {...slot} />
//                                     ))}
//                                   </InputOTPGroup>
//                                 </>
//                               )}
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   )}

//                   {currentStep === 2 && (
//                     <>
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Email"
//                                 type="email"
//                                 className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Password"
//                                 type="password"
//                                 className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="confirmPassword"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <Input
//                                 placeholder="Confirm Password"
//                                 type="password"
//                                 className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </>
//                   )}
//                 </CardContent>

//                 <CardFooter className="px-2 py-2">
//                   <Button
//                     type="submit"
//                     className="w-full"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Submitting...
//                       </>
//                     ) : currentStep === steps.length - 1 ? (
//                       "Submit"
//                     ) : (
//                       "Next"
//                     )}
//                   </Button>
//                 </CardFooter>
//               </form>
//             </Form>
//           </div>
//         </Card>
//       </div>
//     </section>
//   );
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import Stepper from "@/components/ui/stepper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AppLogo from "../../components/logo";

const schema = z
  .object({
    name: z.string().nonempty("First name is required"),
    mobileNumber: z.string().nonempty("Mobile number is required"),
    otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .nonempty("OTP is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Login = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      otp: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const steps = ["Personal Info", "OTP Verification", "Account Details"];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    // Move to next step or finish the form
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form completion (e.g., show success message, redirect)
      console.log("Form submitted successfully!");
    }
  };

  return (
    <section className="bg-background">
      <div className="flex min-h-screen w-full place-items-center lg:grid lg:grid-cols-12">
        <section className="relative hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:flex lg:h-full xl:col-span-6">
          <img
            alt="Decorative background image"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <AppLogo height={50} width={50} />
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Grocery
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>
        <Card className="mx-auto flex w-full max-w-xl items-center justify-center px-4 py-6 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full">
            <CardHeader className="px-2 py-0">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              />
            </CardHeader>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardContent className="px-2 py-0">
                  {currentStep === 0 && (
                    <>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Name"
                                className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Mobile Number"
                                className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === 1 && (
                    <FormField
                      control={form.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="mx-auto flex w-full flex-1">
                            <InputOTP
                              maxLength={6}
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 2 && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                type="email"
                                className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Password"
                                type="password"
                                className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Confirm Password"
                                type="password"
                                className="mt-5 w-full rounded-md py-2.5 pe-10 shadow-sm sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </CardContent>

                <CardFooter className="px-2 py-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : currentStep === steps.length - 1 ? (
                      "Submit"
                    ) : (
                      "Next"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Login;
