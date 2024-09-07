import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
import NavBar from "./components/nav-bar";
import Login from "./screen/auth/Login";
import CategoriesTag from "./screen/CategoriesTag";
import Home from "./screen/Home";
import Product from "./screen/Product";
import Search from "./screen/Search";
import Categories from "./screen/Categories";
import Checkout from "./screen/Checkout";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

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
