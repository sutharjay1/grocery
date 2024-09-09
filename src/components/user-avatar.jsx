import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Hint from "./hint";
import { User, ShoppingBag, MapPin, Settings } from "lucide-react"; // Ensure you import the icons
import { Link } from "react-router-dom";

const menuItems = [
  { icon: User, title: "Profile", href: "/account?section=profile" },
  { icon: ShoppingBag, title: "Orders", href: "/account?section=orders" },
  { icon: MapPin, title: "Address", href: "/account?section=address" },
];

const UserAvatar = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Popover className="relative z-50">
          <PopoverButton
            className={`${open ? "" : "text-opacity-90"} group inline-flex items-center rounded-md text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            onClick={() => setOpen(!open)}
          >
            <Hint label={"Profile"} align="center" alignOffset={10}>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  className="hover:shine-effect relative"
                />
                <AvatarFallback>
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-rose-600 via-purple-800 to-blue-800" />
                </AvatarFallback>
              </Avatar>
            </Hint>
          </PopoverButton>
          <PopoverPanel className="absolute right-0 top-full z-10 mt-3 w-56 max-w-md overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
            <div className="flex w-full flex-1 flex-col py-2">
              <div className="p-2">
                {menuItems.map((item) => (
                  <Link key={item.title} to={item.href} className="w-full">
                    <Button
                      key={item.title}
                      variant="ghost"
                      asChild
                      className="flex w-full items-center justify-start px-4 py-2 text-sm text-zinc-900"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
              <hr className="my-1" />
              <div className="px-2">
                <Button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-zinc-900"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </PopoverPanel>
        </Popover>
      ) : null}
    </div>
  );
};

export default UserAvatar;
