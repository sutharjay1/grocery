import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/nav-bar";
import Login from "./screen/auth/Login";
import Categories from "./screen/Categories";
import CategoriesTag from "./screen/CategoriesTag";
import Checkout from "./screen/Checkout";
import Home from "./screen/Home";
import Product from "./screen/Product";
import Search from "./screen/Search";

const App = () => {
  return (
    <BrowserRouter>
      <div className="font-poppins flex h-full min-h-screen w-full flex-col bg-card text-muted-foreground">
        <NavBar />
        <main className="font-poppins w-full flex-1">
          <AppRouter />
        </main>{" "}
        <Toaster />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

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
    </Routes>
  );
};
