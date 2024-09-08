import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Hint from "./hint";
import { User, ShoppingBag, MapPin, Settings } from "lucide-react"; // Ensure you import the icons

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
        <Popover className="relative">
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
          <PopoverPanel className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <hr className="my-1" />
              <div className="py-1">
                {menuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </a>
                ))}
              </div>
              <hr className="my-1" />
              <div className="px-2">
                <Button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-left text-sm text-zinc-100"
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
