import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Loading from "./components/loading";
import NavBar from "./components/nav-bar";
import Home from "./screen/Home";

const Login = lazy(() => import("./screen/auth/Login"));
const Categories = lazy(() => import("./screen/Categories"));
const CategoriesTag = lazy(() => import("./screen/CategoriesTag"));
const Checkout = lazy(() => import("./screen/Checkout"));
const Product = lazy(() => import("./screen/Product"));
const Search = lazy(() => import("./screen/Search"));
const NotFound = lazy(() => import("./screen/NotFound"));

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;

const AppContent = () => {
  return (
    <div className="font-poppins flex h-full min-h-screen w-full flex-col bg-card text-muted-foreground">
      <NavBar />
      <main className="font-poppins w-full flex-1">
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Login />} />
    <Route path="/categories/:categoryTag" element={<CategoriesTag />} />
    <Route path="/products/:productId" element={<Product />} />
    <Route path="/search" element={<Search />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
