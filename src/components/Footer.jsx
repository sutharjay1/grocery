import React from "react";
import { FaFacebookF, FaPhone } from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";
import { ImLinkedin2 } from "react-icons/im";
import { IoLogoInstagram, IoLogoTwitter, IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";
import { categories } from "../config";
import AppLogo from "./logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const groceryCategories = categories
    .slice(0, 5)
    .map((category) => category.title);

  const customerLinks = [
    { title: "My Account", slug: "my-account" },
    { title: "Order History", slug: "order-history" },
    { title: "Wishlist", slug: "wishlist" },
    { title: "About Us", slug: "about" },
    { title: "Delivery Information", slug: "delivery-information" },
    { title: "Returns & Refunds", slug: "returns-and-refunds" },
  ];

  return (
    <footer className="mt-5 border-t border-gray-200">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <Link to="/" className="mb-6 inline-block">
              <AppLogo />
            </Link>
            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <p className="flex items-center gap-3">
                <HiMapPin className="text-gray-400" />
                <span>123 Grocery Lane, Fresh City, FC 12345</span>
              </p>
              <p className="flex items-center gap-3">
                <IoMail className="text-gray-400" />
                <span>support@freshmart.com</span>
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="rotate-90 text-gray-400" />
                <span>(555) 123-4567</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
              Product Categories
            </h2>
            <ul className="space-y-4">
              {groceryCategories.map((category) => (
                <li key={category}>
                  <Link
                    to={`/categories/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 transition hover:text-gray-900"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
              Customer Service
            </h2>
            <ul className="space-y-4">
              {customerLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.slug}`}
                    className="text-gray-600 transition hover:text-gray-900"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                Contact Us
              </h2>
              <form className="flex w-full max-w-sm items-center space-x-2">
                <input
                  className="w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  type="email"
                  placeholder="Your Email Address"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Send
                </button>
              </form>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900">
                Follow Us
              </h2>
              <div className="flex space-x-4">
                {[FaFacebookF, IoLogoTwitter, IoLogoInstagram, ImLinkedin2].map(
                  (Icon, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Social Media</span>
                      <Icon className="h-6 w-6" />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-8">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; {currentYear} Grocery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
