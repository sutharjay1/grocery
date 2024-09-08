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
import { Loader2, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import AppLogo from "../../components/logo";
import { useSearchParams, useNavigate } from "react-router-dom";

const signupSchema = z.object({
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
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  gender: z.enum(["male", "female", "other"]),
  profileImage: z.string().optional(),
  alternateNumber: z
    .string()
    .regex(/^[0-9]+$/, "Alternate number must contain only digits")
    .length(10, "Alternate number must be exactly 10 digits")
    .optional(),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

const loginSchema = z.object({
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
        <FormItem className="mb-4 w-full">
          <FormControl>
            <div className="relative w-full">
              <input
                type={type}
                {...field}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="peer w-full rounded-sm border border-gray-300 bg-transparent px-4 py-2 text-base placeholder:px-4 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <label
                className={`pointer-events-none absolute left-2 text-gray-500 transition-all duration-200 ease-in-out ${
                  focused || inputValue
                    ? "-top-3 bg-white px-2 text-base font-light text-blue-500"
                    : "top-2 px-3 text-base"
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
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = [
    "https://images.pexels.com/photos/260503/pexels-photo-260503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    setIsSignUp(searchParams.get("signup") === "true");
    const step = searchParams.get("step");
    if (step) {
      setCurrentStep(parseInt(step));
    }
  }, [searchParams]);

  const form = useForm({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
    defaultValues: {
      mobileNumber: "",
      otp: "",
      name: "",
      address: "",
      gender: "",
      profileImage: "",
      alternateNumber: "",
      email: "",
    },
    mode: "onChange",
  });

  const signupSteps = ["Mobile", "OTP Verification", "Personal Information"];
  const loginSteps = ["Mobile", "OTP Verification"];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    if (currentStep < (isSignUp ? signupSteps.length : loginSteps.length)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setSearchParams({
        step: nextStep.toString(),
        signup: isSignUp.toString(),
        ...data,
      });
      setCurrentImage(images[(nextStep - 1) % images.length]);
    } else {
      // Handle final submission
      console.log("Final submission:", data);
      // Navigate to appropriate page after successful login/signup
    }
  };

  const handleNextStep = async () => {
    const result = await form.trigger();
    if (result) {
      await onSubmit(form.getValues());
    }
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setCurrentStep(1);
    setSearchParams({ signup: (!isSignUp).toString(), step: "1" });
    form.reset();
    setCurrentImage(images[0]);
  };

  const handleStepChange = (index) => {
    setCurrentStep(index);
    setSearchParams({ signup: isSignUp.toString(), step: index.toString() });
  };

  const renderStepContent = () => {
    if (isSignUp) {
      switch (currentStep) {
        case 1:
          return (
            <FloatingLabelInput
              label="Mobile Number"
              name="mobileNumber"
              form={form}
            />
          );
        case 2:
          return (
            <FormField
              control={form.control}
              name="otp"
              className="mx-auto"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="mx-auto flex w-full flex-1 items-center justify-center">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
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
          );
        case 3:
          return (
            <div className="flex w-full flex-col space-y-4">
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center justify-center">
                        <div
                          className="flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200"
                          onClick={() =>
                            document.getElementById("profileImageInput").click()
                          }
                        >
                          {field.value ? (
                            <img
                              src={URL.createObjectURL(field.value)}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-400">
                              <User size={48} />
                            </span>
                          )}
                        </div>
                        <input
                          id="profileImageInput"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            field.onChange(
                              e.target.files ? e.target.files[0] : null,
                            )
                          }
                          className="hidden"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FloatingLabelInput label="Name" name="name" form={form} />
              <FloatingLabelInput
                label="Email"
                name="email"
                type="email"
                form={form}
              />
              <FloatingLabelInput label="Address" name="address" form={form} />
              <FloatingLabelInput
                label="Alternate Number"
                name="alternateNumber"
                form={form}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <select
                        {...field}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return (
            <FloatingLabelInput
              label="Mobile Number"
              name="mobileNumber"
              form={form}
            />
          );
        case 2:
          return (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="mx-auto flex w-full flex-1">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
          );
        default:
          return null;
      }
    }
  };

  return (
    <section className="h-[calc(100vh-5rem)] bg-card">
      <div className="flex h-full w-full place-items-center lg:grid lg:grid-cols-12">
        <section className="relative hidden h-32 items-end bg-gray-900 lg:col-span-5 lg:flex lg:h-full xl:col-span-6">
          <img
            alt="Decorative background image"
            src={currentImage}
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
        <Card className="mx-auto flex w-full max-w-xl items-center justify-center px-4 py-6 sm:px-8 lg:col-span-7 lg:px-16 lg:py-8 xl:col-span-6">
          <div className="w-full">
            <CardHeader className="px-2 py-0">
              <h1 className="my-2 text-center text-xl font-bold text-gray-900 sm:text-2xl">
                {isSignUp ? "Sign Up" : "Login"}
              </h1>

              <Stepper
                steps={isSignUp ? signupSteps : loginSteps}
                currentStep={currentStep}
                setCurrentStep={handleStepChange}
              />
            </CardHeader>
            <Form {...form}>
              <form
                className="mt-8 space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <CardContent className="mx-auto flex w-full items-center justify-center px-2 py-0">
                  {renderStepContent()}
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 px-2 py-2 pt-0">
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
                    ) : currentStep ===
                      (isSignUp ? signupSteps.length : loginSteps.length) ? (
                      "Submit"
                    ) : (
                      "Next"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={handleToggleSignUp}
                  >
                    {isSignUp
                      ? "Already have an account? Login"
                      : "Don't have an account? Sign Up"}
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
