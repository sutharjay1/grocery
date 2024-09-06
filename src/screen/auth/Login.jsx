import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useSearchParams } from "react-router-dom";

const schema = z
  .object({
    name: z.string().nonempty("Name is required"),
    mobileNumber: z
      .string()
      .nonempty("Mobile number is required")
      .regex(/^[0-9]+$/, "Mobile number must contain only digits")
      .length(10, "Mobile number must be exactly 10 digits"),
    otp: z
      .string()
      .nonempty("OTP is required")
      .length(6, "OTP must be 6 digits")
      .regex(/^[0-9]+$/, "OTP must contain only digits"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const FloatingLabelInput = ({ label, name, type = "text", form }) => {
  const [focused, setFocused] = useState(false);
  const inputValue = form.watch(name);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => {
    if (inputValue === "") setFocused(false);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormControl>
            <div className="relative w-full">
              <input
                type={type}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="peer w-full rounded-lg border-2 border-gray-300 bg-transparent px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
              <label
                className={`absolute left-4 top-2 select-none text-gray-500 transition-all duration-200 ease-in-out ${
                  focused || inputValue
                    ? "-top-3 bg-white px-1 text-xs text-blue-500"
                    : "top-2 text-base"
                }`}
              >
                {label}
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [showNameOTP, setShowNameOTP] = useState(false);

  const [otp, setOtp] = useState("");

  useEffect(() => {
    setIsSignUp(searchParams.get("signup") === "true");
  }, [searchParams]);

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
    mode: "onChange",
  });

  const steps = ["Personal Info", "OTP Verification", "Account Details"];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      console.log("Form submitted:", data);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 0) {
      const result = await form.trigger(["name", "mobileNumber"]);
      if (result) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else if (currentStep === 1) {
      const result = await form.trigger("otp");
      if (result) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      const result = await form.trigger();
      if (result) {
        await onSubmit(form.getValues());
      }
    }
  };

  const handleLoginClick = () => {
    setShowNameOTP(true);
  };

  const handleGoogleLogin = () => {
    setShowNameOTP(true);
  };

  const handleAlreadyHaveAccount = () => {
    setIsSignUp(false);
    setSearchParams({ signup: "false" });
  };

  const images = [
    "https://images.pexels.com/photos/260503/pexels-photo-260503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  const [randomImageState, setRandomImageState] = useState(images.length);

  const getRandomImage = () => {
    return images[Math.floor(Math.random() * Math.floor(randomImageState))];
  };

  return (
    <section className="h-full bg-card">
      <div className="flex h-full w-full place-items-center lg:grid lg:grid-cols-12">
        <section className="relative hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:flex lg:h-full xl:col-span-6">
          <img
            alt="Decorative background image"
            src={getRandomImage()}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden bg-gradient-to-t from-gray-950 to-gray-900/[0.01] lg:relative lg:block lg:px-12 lg:pb-16 lg:pt-36">
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
              {isSignUp ? (
                <Stepper
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              ) : (
                <h2 className="text-2xl font-bold">Login</h2>
              )}
            </CardHeader>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardContent className="px-2 py-0">
                  {isSignUp ? (
                    <>
                      {currentStep === 0 && (
                        <>
                          <FloatingLabelInput
                            label="Name"
                            name="name"
                            form={form}
                          />
                          <FloatingLabelInput
                            label="Mobile Number"
                            name="mobileNumber"
                            form={form}
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
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setOtp(value);
                                  }}
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
                          <FloatingLabelInput
                            label="Email"
                            name="email"
                            type="email"
                            form={form}
                          />
                          <FloatingLabelInput
                            label="Password"
                            name="password"
                            type="password"
                            form={form}
                          />
                          <FloatingLabelInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            form={form}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <FloatingLabelInput
                        label="Email"
                        name="email"
                        type="email"
                        form={form}
                      />
                      <FloatingLabelInput
                        label="Password"
                        name="password"
                        type="password"
                        form={form}
                      />
                    </>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 px-2 py-2">
                  {isSignUp ? (
                    <>
                      <Button
                        type="button"
                        className="w-full rounded-lg"
                        disabled={isSubmitting}
                        onClick={handleNextStep}
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
                      <Button
                        type="button"
                        variant="link"
                        className="w-full"
                        onClick={handleAlreadyHaveAccount}
                      >
                        Already have an account? Login
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button type="submit" className="w-full rounded-lg">
                        Login
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-lg"
                        onClick={handleGoogleLogin}
                      >
                        Login with Google
                      </Button>
                    </>
                  )}
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
