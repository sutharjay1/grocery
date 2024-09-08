import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 text-gray-800">
      <img
        src="https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="404 Not Found"
        className="mb-6 h-40 w-40 rounded-full object-cover sm:h-64 sm:w-64 md:mb-8"
      />
      <h1 className="mb-3 text-center text-2xl font-bold text-gray-900 sm:text-3xl md:mb-4 md:text-4xl">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-center text-base text-gray-700 sm:text-lg md:mb-8 md:text-xl">
        The page you are looking for does not exist.
      </p>{" "}
      <Link to="/categories">
        <Button asChild className="rounded px-4 py-2 font-bold text-white">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
