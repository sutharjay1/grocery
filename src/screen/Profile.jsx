import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Highlight } from "../../components/Highlight";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="https://example.com/user-profile.jpg"
            alt="User Profile"
          />
          <AvatarFallback delayMs={300}>JD</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-600">john.doe@example.com</p>
      </div>
      <div className="mt-8">
        <Accordion>
          <AccordionItem value="settings">
            <AccordionTrigger>Settings</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Dark Mode</span>
                  <Button variant="outline" className="px-4 py-2">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Language</span>
                  <select className="form-select mt-1 block w-full">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="orders">
            <AccordionTrigger>Orders</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Highlight
                  badge="New"
                  title="Order #1234"
                  description="Your order has been shipped."
                  buttonText="View Details"
                  buttonLink="/order/1234"
                />
                <Highlight
                  badge="Completed"
                  title="Order #5678"
                  description="Your order has been delivered."
                  buttonText="View Details"
                  buttonLink="/order/5678"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="logout">
            <AccordionTrigger>Logout</AccordionTrigger>
            <AccordionContent>
              <div className="text-center">
                <Button variant="solid" className="w-full py-2">
                  Logout
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UserProfile;
