import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
import NavBar from "./components/nav-bar";
import Login from "./screen/auth/Login";
import Categories from "./screen/Categories";
import Home from "./screen/Home";
import Product from "./screen/Product";

const App = () => {
  return (
    <BrowserRouter>
      <div className="font-poppins flex h-full min-h-screen w-full flex-col bg-muted-foreground text-muted-foreground">
        <NavBar />
        <main className="font-poppins w-full flex-1 bg-primary">
          <AppRouter />
        </main>
        {/* <Footer /> */}
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
      <Route path="/categories/:categoryTag" element={<Categories />} />
      <Route path="/products/:productId" element={<Product />} />
    </Routes>
  );
};
