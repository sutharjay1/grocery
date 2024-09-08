import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogOut, MapPin, Settings, ShoppingBag, User } from "lucide-react";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { Motion } from "../../components/motion";
import { Button } from "../../components/ui/button";
import ProfileContent from "./ProfileContent";
import Orders from "./Orders";
import Address from "./Address";
import Setting from "./Setting";

const menuItems = [
  { icon: User, title: "Profile", href: "/profile" },
  { icon: ShoppingBag, title: "Orders", href: "/orders" },
  { icon: MapPin, title: "Address", href: "/address" },
];

const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSection, setSelectedSection] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const section = searchParams.get("section") || "profile";
    setSelectedSection(section);
  }, [searchParams]);

  const getSection = (title) => title.toLowerCase().replace(/ /g, "-");

  const handleSectionChange = (title) => {
    const section = getSection(title);
    setSelectedSection(section);

    const url = qs.stringifyUrl(
      {
        url: `/account`,
        query: { section },
      },
      { skipNull: true },
    );
    navigate(url, { replace: true });
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "orders":
        return <Orders />;
      case "address":
        return <Address />;
      case "profile":
        return <ProfileContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <MaxWidthWrapper className="h-[calc(100vh-7rem)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto h-full max-w-7xl">
        <Motion direction="up" duration={1.8} up={70}>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <Card className="lg:w-1/3">
              <CardHeader className="pb-4 lg:pb-6">
                <CardTitle className="text-xl font-bold lg:text-2xl">
                  My Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center space-x-4 lg:mb-6">
                  <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                      alt="User"
                    />
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-bold lg:text-2xl">Acme</h2>
                    <p className="text-sm text-gray-600 lg:text-lg">
                      +91 9876543210
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      Pass Member
                    </Badge>
                  </div>
                </div>
                <p className="mb-2 text-xs text-gray-600 lg:mb-4 lg:text-sm">
                  Valid till 14 Sep
                </p>
                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <Button
                      key={item.title}
                      variant={
                        selectedSection === getSection(item.title)
                          ? "default"
                          : "ghost"
                      }
                      className={cn(
                        "w-full justify-start rounded-lg py-4 lg:py-6",
                        selectedSection === getSection(item.title) &&
                          "bg-primary/80",
                      )}
                      onClick={() => handleSectionChange(item.title)}
                    >
                      <item.icon className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                      {item.title}
                    </Button>
                  ))}
                  <Button
                    variant="destructive"
                    className="w-full justify-start rounded-lg py-4 hover:text-zinc-800 lg:py-6"
                  >
                    <LogOut className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                    Log Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardContent className="p-0">{renderSection()}</CardContent>
            </Card>
          </div>
        </Motion>
      </div>
    </MaxWidthWrapper>
  );
};

export default Account;
