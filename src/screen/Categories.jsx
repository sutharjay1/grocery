import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CategoryCard from "../components/category-card";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { categories } from "../config";
import { useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * categories.length);
      setActiveCategory(categories[randomIndex].title);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <div className="mx-auto max-w-6xl">
        <div className="">
          <div className="border-b border-gray-200 pb-10 pt-10 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl md:text-5xl"
            >
              Explore Our Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-sm text-gray-600 dark:text-gray-300 sm:text-base"
            >
              Discover a world of fresh, high-quality products in our curated
              categories.
            </motion.p>
          </div>

          <div className="py-12 sm:py-16">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <motion.div
                  key={category.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: activeCategory === category.title ? 1.1 : 1,
                    zIndex: activeCategory === category.title ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Categories;
