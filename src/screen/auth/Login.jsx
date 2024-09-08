import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
import Stepper from "@/components/ui/stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import AppLogo from "../../components/logo";

const signupSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]+$/, "Mobile number must contain only digits")
    .length(10, "Mobile number must be exactly 10 digits")
    .optional(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only digits")
    .optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  profileImage: z.string().optional(),
  alternateNumber: z
    .string()
    .regex(/^[0-9]+$/, "Alternate number must contain only digits")
    .length(10, "Alternate number must be exactly 10 digits")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
});

const loginSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]+$/, "Mobile number must contain only digits")
    .length(10, "Mobile number must be exactly 10 digits")
    .optional(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only digits")
    .optional(),
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
          {field.value && <FormMessage />}
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
  const [errorMessage, setErrorMessage] = useState("");

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
    setErrorMessage("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle final submission
      console.log("Final submission:", data);
      // Navigate to page after successful login/signup
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    const data = form.getValues();
    const nextStep = currentStep + 1;
    if (nextStep <= (isSignUp ? signupSteps.length : loginSteps.length)) {
      setCurrentStep(nextStep);
      setSearchParams({
        signup: isSignUp.toString(),
        step: nextStep.toString(),
      });
      setCurrentImage(images[(nextStep - 1) % images.length]);
    }
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setCurrentStep(1);
    setSearchParams({ signup: (!isSignUp).toString(), step: "1" });
    form.reset();
    setCurrentImage(images[0]);
    setErrorMessage("");
  };

  const handleStepChange = (index) => {
    setCurrentStep(index);
    setSearchParams((prev) => {
      prev.set("step", index.toString());
      return prev;
    });
    setCurrentImage(images[(index - 1) % images.length]);
    setErrorMessage("");
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
                  {field.value && <FormMessage />}
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
                    {field.value && <FormMessage />}
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
                    {field.value && <FormMessage />}
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
                  {field.value && <FormMessage />}
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
        <Card className="mx-auto flex w-full max-w-xl items-center justify-center px-4 py-6 sm:px-8 lg:col-span-7 lg:px-16 lg:py-6 xl:col-span-6">
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

                {errorMessage && (
                  <p className="text-center text-sm text-red-500">
                    {errorMessage}
                  </p>
                )}

                <CardFooter className="flex flex-col space-y-4 px-2 py-2 pt-0">
                  {currentStep <
                  (isSignUp ? signupSteps.length : loginSteps.length) ? (
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
                      ) : (
                        "Next"
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full rounded-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  )}
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
