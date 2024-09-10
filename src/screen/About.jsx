import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Apple, Leaf, ShieldCheck, Truck } from "lucide-react";
import { FaAndroid } from "react-icons/fa6";
import { motion } from "framer-motion";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { Motion } from "../components/motion";
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from "../components/ui/carousel";

const About = () => {
  return (
    <MaxWidthWrapper className="pt-5">
      <div className="container mx-auto py-8">
        <section className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-2 text-3xl font-bold capitalize tracking-tight text-primary sm:text-4xl md:text-5xl"
          >
            About Grocery
          </motion.h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Bringing fresh, quality groceries to your doorstep
          </p>
          <div className="relative h-64 overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="Fresh produce"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <p className="px-4 text-2xl font-semibold text-white">
                Fresh. Fast. Friendly.
              </p>
            </div>
          </div>
        </section>

        <Motion direction="up" duration={1.8} up={70}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              At FreshMart, we're on a mission to revolutionize grocery
              shopping. We believe everyone deserves access to fresh,
              high-quality produce and pantry essentials, delivered right to
              their door with just a few taps on their phone.
            </p>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8} up={200}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Our Journey
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  From Farm to Phone
                </h3>
                <p className="text-muted-foreground">
                  Founded in 2020, FreshMart started as a small team of food
                  enthusiasts who wanted to bridge the gap between local farmers
                  and urban consumers. What began as a weekend farmer's market
                  delivery service has now grown into a full-fledged grocery
                  delivery app serving thousands of customers daily.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Growing with Our Community
                </h3>
                <p className="text-muted-foreground">
                  As we've grown, we've never lost sight of our roots. We
                  continue to partner with local farmers and artisans, ensuring
                  that our growth supports local communities and sustainable
                  farming practices.
                </p>
              </div>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Our Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Leaf className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
                  <p className="text-center text-muted-foreground">
                    We're committed to eco-friendly practices, from sourcing to
                    delivery.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <ShieldCheck className="mb-4 h-12 w-12 text-blue-500" />
                  <h3 className="mb-2 text-xl font-semibold">Quality</h3>
                  <p className="text-center text-muted-foreground">
                    We handpick every item to ensure only the best reaches your
                    kitchen.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <Truck className="mb-4 h-12 w-12 text-purple-500" />
                  <h3 className="mb-2 text-xl font-semibold">Convenience</h3>
                  <p className="text-center text-muted-foreground">
                    Fast, reliable delivery that fits your busy lifestyle.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Meet Our Team
            </h2>
            <div className="hidden gap-8 md:grid-cols-4 lg:grid">
              {[1, 2, 3, 4].map((member) => (
                <Card key={member}>
                  <CardContent className="p-4">
                    <img
                      src={`/placeholder.svg?height=150&width=150&text=Team Member ${member}`}
                      alt={`Team member ${member}`}
                      className="mb-4 h-40 w-full rounded-full object-cover"
                    />
                    <h3 className="text-center text-lg font-semibold">
                      John Doe
                    </h3>
                    <p className="text-center text-sm text-muted-foreground">
                      Co-founder & CEO
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex w-full lg:hidden">
              <div className="relative w-full">
                <Carousel>
                  <CarouselContent className="-ml-4">
                    <CarouselItem className="pl-4">
                      <Card>
                        <CardContent className="p-4">
                          <img
                            src={`/placeholder.svg?height=150&width=150&text=Team Member`}
                            alt={`Team member`}
                            className="mb-4 h-40 w-full rounded-full object-cover"
                          />
                          <h3 className="text-center text-lg font-semibold">
                            John Doe
                          </h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Co-founder & CEO
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4">
                      <Card>
                        <CardContent className="p-4">
                          <img
                            src={`/placeholder.svg?height=150&width=150&text=Team Member`}
                            alt={`Team member`}
                            className="mb-4 h-40 w-full rounded-full object-cover"
                          />
                          <h3 className="text-center text-lg font-semibold">
                            John Doe
                          </h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Co-founder & CEO
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4">
                      <Card>
                        <CardContent className="p-4">
                          <img
                            src={`/placeholder.svg?height=150&width=150&text=Team Member`}
                            alt={`Team member`}
                            className="mb-4 h-40 w-full rounded-full object-cover"
                          />
                          <h3 className="text-center text-lg font-semibold">
                            John Doe
                          </h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Co-founder & CEO
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem className="pl-4">
                      <Card>
                        <CardContent className="p-4">
                          <img
                            src={`/placeholder.svg?height=150&width=150&text=Team Member`}
                            alt={`Team member`}
                            className="mb-4 h-40 w-full rounded-full object-cover"
                          />
                          <h3 className="text-center text-lg font-semibold">
                            John Doe
                          </h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Co-founder & CEO
                          </p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselNavigation
                    className="absolute -bottom-14 left-auto top-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                  />
                  <CarouselIndicator className="absolute -bottom-6 left-auto top-auto w-full justify-center gap-2" />
                </Carousel>
              </div>
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="mb-16">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              What Our Customers Say
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {[1, 2].map((testimonial) => (
                <Card key={testimonial}>
                  <CardContent className="p-6">
                    <p className="mb-4 italic text-muted-foreground">
                      "FreshMart has completely changed how I shop for
                      groceries. The produce is always fresh, and the
                      convenience is unbeatable!"
                    </p>
                    <p className="font-semibold">
                      - Happy Customer {testimonial}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </Motion>

        <Motion direction="up" duration={1.8}>
          <section className="text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-primary">
              Ready to Start Shopping Smarter?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Download the FreshMart app today and experience the future of
              grocery shopping.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="flex items-center">
                <Apple className="mr-2 h-5 w-5" />
                Download for iOS
              </Button>
              <Button className="flex items-center">
                <FaAndroid className="mr-2 h-5 w-5" />
                Download for Android
              </Button>
            </div>
          </section>
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default About;
