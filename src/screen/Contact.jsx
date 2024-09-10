"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MaxWidthWrapper from "../components/max-width-wrapper";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  agreeToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
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
                className={`pointer-events-none absolute left-2 text-sm text-gray-500 transition-all duration-200 ease-in-out md:text-base ${
                  focused || inputValue
                    ? "-top-3 bg-white px-2 font-light text-blue-500"
                    : "top-2 px-3"
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

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      agreeToPolicy: false,
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MaxWidthWrapper className="pt-5">
      <div className="container mx-auto py-8">
        <section className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-1 text-3xl font-bold capitalize tracking-tight text-primary sm:text-4xl md:text-5xl"
          >
            Get in touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-600 dark:text-gray-300 sm:text-base"
          >
            Our friendly team would love to hear from you.
          </motion.p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="lg:order-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingLabelInput
                      label="First Name"
                      name="firstName"
                      form={form}
                    />
                    <FloatingLabelInput
                      label="Last Name"
                      name="lastName"
                      form={form}
                    />
                  </div>
                  <FloatingLabelInput
                    label="Email"
                    name="email"
                    type="email"
                    form={form}
                  />
                  <FloatingLabelInput
                    label="Phone number"
                    name="phoneNumber"
                    type="tel"
                    form={form}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Your message"
                            className="peer w-full rounded-sm border border-gray-300 bg-transparent px-4 py-2 text-base placeholder:px-4 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agreeToPolicy"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <label
                            htmlFor="agreeToPolicy"
                            className="text-sm font-medium leading-none"
                          >
                            You agree to our friendly{" "}
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              privacy policy
                            </a>
                            .
                          </label>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex-grow space-y-8 lg:order-1">
            <div className="grid gap-4 md:grid-rows-3">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <Phone size={24} className="text-primary" />
                  <CardTitle>Phone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+91 9876543210</p>
                  <p className="text-sm text-muted-foreground">
                    Mon-Fri: 9am-6pm
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <Mail size={24} className="text-primary" />
                  <CardTitle>Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">support@freshmart.com</p>
                  <p className="text-sm text-muted-foreground">
                    We'll respond within 24 hours
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <MapPin size={24} className="text-primary" />
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">123 Grocery Lane</p>
                  <p className="text-muted-foreground">Mumbai, MH 400001</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="mb-4 text-3xl font-semibold text-[#16191E]">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What are your delivery hours?</AccordionTrigger>
              <AccordionContent>
                We deliver 7 days a week, from 8am to 10pm. You can choose your
                preferred delivery slot during checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order is confirmed, you'll receive a tracking link via
                email and SMS. You can also track your order in real-time
                through our app.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What's your return policy?</AccordionTrigger>
              <AccordionContent>
                If you're not satisfied with any product, you can return it
                within 24 hours of delivery. Our delivery person can process the
                return at your doorstep.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Do you offer same-day delivery?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we offer same-day delivery for orders placed before 3pm,
                subject to availability and your location.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default Contact;
