import React from "react";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Bell, ChevronDown } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

const Overview = () => {
  return (
    <main className="flex-1 p-4 sm:p-8">
      <div className="mb-6 flex flex-col items-start justify-between sm:mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {" "}
            Overview
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            {" "}
            Check your store's latest performance
          </p>
        </div>
      </div>
    </main>
  );
};

export default Overview;
