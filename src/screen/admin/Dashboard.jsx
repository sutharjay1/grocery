import { Package2 } from "lucide-react";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import Overview from "./Overview";
import Analytics from "./Analytics";
import Orders from "./Orders";
import Products from "./Products";
import Customers from "./Customers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const sections = ["overview", "analytics", "orders", "products", "customers"];

const DashBoard = () => {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <main className="flex h-screen w-full flex-col gap-4 pb-16">
      <Toaster />
      {selectedSection === "overview" && <Overview />}
      {selectedSection === "analytics" && <Analytics />}
      {selectedSection === "orders" && <Orders />}
      {selectedSection === "products" && <Products />}
      {selectedSection === "customers" && <Customers />}
    </main>
  );
};

export default DashBoard;
