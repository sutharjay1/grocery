"use client";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { GiFruitBowl } from "react-icons/gi";
import { Link } from "react-router-dom";

import { Banana, CupSoda, Milk, Pizza } from "lucide-react";
import { FaBreadSlice, FaEgg, FaIceCream } from "react-icons/fa6";
import { cn } from "../lib/utils";
import Cart from "./cart/cart";
import Heart from "./heart";
import AppLogo from "./logo";
import Profile from "./profile";
import SearchInput from "./search-input";

const categories = [
  {
    name: "Fruits & Vegetables",
    description: "Fresh fruits and vegetables delivered to your doorstep.",
    to: "/fruits-vegetables",
    icon: GiFruitBowl,
  },
  {
    name: "Dairy & Eggs",
    description: "Milk, cheese, eggs, and other dairy products.",
    to: "/dairy-eggs",
    icon: FaEgg,
  },
  {
    name: "Bakery & Snacks",
    description: "Freshly baked bread, cookies, and snacks.",
    to: "/bakery-snacks",
    icon: FaBreadSlice,
  },
  {
    name: "Beverages",
    description: "Juices, soft drinks, and other beverages.",
    to: "/beverages",
    icon: CupSoda,
  },
  {
    name: "Frozen Foods",
    description: "Frozen meals, ice cream, and more.",
    to: "/frozen-foods",
    icon: FaIceCream,
  },
];

const products = [
  {
    name: "Bananas",
    description: "Fresh and ripe bananas.",
    category: "Fruits & Vegetables",
    price: "$1.20 per lb",
    to: "/product/bananas",
    icon: Banana,
  },
  {
    name: "Organic Milk",
    description: "1 gallon of organic whole milk.",
    category: "Dairy & Eggs",
    price: "$4.50",
    to: "/product/organic-milk",
    icon: Milk,
  },
  {
    name: "Sourdough Bread",
    description: "Freshly baked sourdough bread.",
    category: "Bakery & Snacks",
    price: "$3.00",
    to: "/product/sourdough-bread",
    icon: FaBreadSlice,
  },
  {
    name: "Orange Juice",
    description: "Freshly squeezed orange juice.",
    category: "Beverages",
    price: "$5.00 per bottle",
    to: "/product/orange-juice",
    icon: CupSoda,
  },
  {
    name: "Frozen Pizza",
    description: "Delicious frozen pizza ready to bake.",
    category: "Frozen Foods",
    price: "$6.99",
    to: "/product/frozen-pizza",
    icon: Pizza,
  },
];

const callsToAction = [
  { name: "View Cart", to: "/cart", icon: Cart },
  { name: "Checkout", to: "/checkout", icon: Cart },
];

const links = [
  { name: "Home", to: "/" },
  // { name: "Shop by Category", section },
  { name: "Deals", to: "/deals" },
  // { name: "My Orders", to: "/orders" },
  { name: "Profile", to: "/profile" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-9xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-none">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <AppLogo />
          </Link>
        </div>
        <div className="flex space-x-4 lg:hidden">
          <Heart />
          <Cart />
          {mobileMenuOpen ? (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-my-2.5 rounded-md py-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-my-2.5 inline-flex items-center justify-center rounded-md py-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="hidden w-full items-center justify-between gap-x-12 pl-14 pr-2 lg:flex">
          <PopoverGroup className="flex lg:gap-x-12">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {link.name}
              </Link>
            ))}
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Product
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                //   transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.to}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <Popover className="relative hidden">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Shop by Category
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel
                //   transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-4">
                  {categories.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.to}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          </PopoverGroup>
          <SearchInput className="hidden lg:flex" />
        </div>
        <div className="hidden gap-x-6 lg:flex lg:justify-end">
          <Heart />
          <Cart />
          <Profile />

          <Link
            to="/signup"
            className="hidden text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="z-30 lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <AppLogo />
            </Link>
            <div className="flex space-x-4">
              <Cart />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-my-2.5 rounded-md py-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as={Link}
                        to={item.to}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-6 py-6">
                <Link
                  to="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <SearchInput className={cn("lg:hidden", mobileMenuOpen && "hidden")} />

      {/* <div className="relative z-10 w-full px-4 lg:hidden">
        <Search className="pointer-events-none absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for Fruits, Vegetables and more..."
          className="w-full rounded-xl py-6 pl-10 pr-6 ring-0 focus-visible:outline-none"
          //   onChange={handleChange}
          aria-label="Search for products"
        />
      </div> */}
    </header>
  );
};

export default NavBar;