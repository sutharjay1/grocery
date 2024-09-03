import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar";
import Home from "./screen/Home";
import NavBar from "./components/nav-bar";
import Login from "./screen/auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-muted-foreground font-poppins text-muted-foreground flex h-full min-h-screen w-full flex-col">
        <NavBar />
        <main className="bg-primary font-poppins w-full flex-1">
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
      {/* <Route path="/help" element={<Help />} /> */}
    </Routes>
  );
};
