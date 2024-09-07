import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/nav-bar";
import Login from "./screen/auth/Login";
import Categories from "./screen/Categories";
import CategoriesTag from "./screen/CategoriesTag";
import Checkout from "./screen/Checkout";
import Home from "./screen/Home";
import Product from "./screen/Product";
import Search from "./screen/Search";
import Admin from "./screen/admin/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="font-poppins flex h-full min-h-screen w-full flex-col bg-card text-muted-foreground">
      {location.pathname !== "/admin" && <NavBar />}
      <main className="font-poppins w-full flex-1">
        <AppRouter />
      </main>{" "}
      <Toaster />
      {location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Login />} />
      <Route path="/categories/:categoryTag" element={<CategoriesTag />} />
      <Route path="/products/:productId" element={<Product />} />
      <Route path="/search" element={<Search />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
