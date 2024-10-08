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
import {
  Banana,
  ChevronDown,
  CupSoda,
  Menu,
  Milk,
  Pizza,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaBreadSlice, FaEgg, FaIceCream } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import Cart from "./cart/cart";
import Heart from "./heart";
import AppLogo from "./logo";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import UserAvatar from "./user-avatar";

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
  { name: "Deals", to: "/deals" },
];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(true);

  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [user, location]);

  return (
    <header className="sticky top-0 z-40 border-b bg-card">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-none">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <AppLogo />
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-2 lg:hidden">
          <Heart />
          <Cart />
          {user ? (
            <UserAvatar user={user} setUser={setUser} />
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md py-2.5 pt-2 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="h-7 w-7" />
            </Button>
          )}
        </div>
        <div className="hidden w-full items-center justify-between gap-x-12 pl-14 pr-2 lg:flex">
          <PopoverGroup className="flex lg:gap-x-8">
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
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
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
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 flex-none text-gray-400"
                />
              </PopoverButton>

              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
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
        <div className="hidden items-center gap-x-2 lg:flex lg:justify-end">
          <Heart />
          <Cart />
          {user ? (
            <UserAvatar user={user} setUser={setUser} />
          ) : (
            <Link
              to="/signup"
              className="-mx-3 block rounded-lg px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              <Button
                variant="default"
                className="flex w-full items-center space-x-2"
              >
                <span>Login / Signup</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="z-[100] lg:hidden"
      >
        <div className="fixed inset-0" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <AppLogo />
            </Link>
            <div className="flex space-x-2">
              <Heart />
              <Cart />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md py-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDown
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
                  className="-mx-3 block rounded-lg text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <Button
                    variant="default"
                    // onClick={() => setUser(true)}
                    className="flex w-full items-center space-x-2 px-3 py-2.5"
                  >
                    <span>Login / Signup</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <SearchInput className={cn("mb-4 lg:hidden")} />
    </header>
  );
};

export default NavBar;
