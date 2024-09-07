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

const Analytics = () => {
  return (
    <main className="flex-1 p-4 sm:p-8">
      <div className="mb-6 flex flex-col items-start justify-between sm:mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Analytics
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Check your store's latest performance
          </p>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <Card className="bg-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold sm:text-3xl">$327,820</div>
            <p className="text-xs">+15.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
              502,042
            </div>
            <p className="text-xs text-green-500">+18.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Refunded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
              50,431
            </div>
            <p className="text-xs text-red-500">-15.5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              Online Store Sessions
            </CardTitle>
            <Button variant="ghost" size="sm">
              View Report <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 sm:text-3xl">
              69
            </div>
            <p className="text-xs text-green-500">+15.5% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-600 text-white">
          <CardHeader>
            <CardTitle>Need More Stats?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm sm:text-base">
              Unlock advanced analytics and get deeper insights into your
              store's performance.
            </p>
            <Button variant="secondary">Go Premium</Button>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900">
            Popular Products
          </CardTitle>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-4 h-10 w-10 rounded bg-gray-200"></div>
              <div>
                <p className="font-medium text-gray-900">
                  Pokemon Pikachu Action Figure Pokemon
                </p>
                <p className="text-sm text-gray-500">500+ sales</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4 h-10 w-10 rounded bg-gray-200"></div>
              <div>
                <p className="font-medium text-gray-900">
                  Apple Watch 7 Nike Edition
                </p>
                <p className="text-sm text-gray-500">450+ sales</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4 h-10 w-10 rounded bg-gray-200"></div>
              <div>
                <p className="font-medium text-gray-900">
                  Andie VR-X Premium Customizable Wireless
                </p>
                <p className="text-sm text-gray-500">360+ sales</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Analytics;
