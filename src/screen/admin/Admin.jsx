import {
  Bell,
  BookAIcon,
  HomeIcon,
  LineChart,
  Menu,
  Package2,
  Search,
  Users,
  ShoppingBasket,
  X,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sheet from "../../components/sheet";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import DashBoard from "./Dashboard";
import Overview from "./Overview";
import Analytics from "./Analytics";
import Orders from "./Orders";
import Products from "./Products";
import Customers from "./Customers";
import AppLogo from "../../components/logo";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { cn } from "../../lib/utils";
import qs from "query-string";

const sections = ["overview", "analytics", "orders", "products", "customers"];

const Admin = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setMobileMenuOpen(false);

    const url = qs.stringifyUrl(
      {
        url: `/admin`,
        query: { section },
      },
      { skipEmptyString: true, skipNull: true },
    );
    navigate(url, { replace: true });
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("section")) {
      setSelectedSection(searchParams.get("section"));
    }
  }, [searchParams]);

  return (
    <>
      <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link to={"/"} className="flex items-center gap-2 font-semibold">
                <AppLogo />
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {sections.map((section) => (
                  <span
                    key={section}
                    onClick={() => handleSectionChange(section)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${
                      selectedSection === section
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    } transition-all hover:text-primary`}
                  >
                    {section === "dashboard" && (
                      <HomeIcon className="h-4 w-4" />
                    )}
                    {section === "overview" && (
                      <LineChart className="h-4 w-4" />
                    )}
                    {section === "users" && <Users className="h-4 w-4" />}
                    {section === "products" && <Package2 className="h-4 w-4" />}
                    {section === "orders" && <BookAIcon className="h-4 w-4" />}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center gap-4 px-2">
              {/* <ToggleButton /> */}
              {/* <UserButton /> */}
            </div>
          </header>
          {selectedSection === "dashboard" && <DashBoard />}
          {selectedSection === "overview" && <Overview />}
          {selectedSection === "analytics" && <Analytics />}
          {selectedSection === "orders" && <Orders />}
          {selectedSection === "products" && <Products />}
          {selectedSection === "customers" && <Customers />}
        </div>
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="z-30 md:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <AppLogo />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-my-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-6">
                  {({ open }) => (
                    <>
                      {sections.map((section) => (
                        <DisclosureButton
                          key={section}
                          as="button"
                          onClick={() => handleSectionChange(section)}
                          className="block w-full rounded-lg py-2 pl-6 pr-3 text-left text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </DisclosureButton>
                      ))}
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="py-6">
                <Link
                  to="/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Admin;
