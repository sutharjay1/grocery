import React, { useCallback, useMemo, useState } from "react";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { useParams } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, PlusCircle, X } from "lucide-react";
import Sheet from "../components/sheet";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import { productFilter, productsByCategory } from "../config";
import ImageSlider from "../components/image-slider";
import { Checkbox } from "@/components/ui/checkbox";
import AddToCartButton from "../components/cart/add-to-cart-button";
import { formatPrice } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";
import { Button } from "../components/ui/button";
import Card from "../components/card";

const ProductFilter = ({ categoryTag, filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = useCallback(
    (sectionId, value) => {
      setSelectedFilters((prev) => {
        const newFilters = {
          ...prev,
          [sectionId]: prev[sectionId]
            ? prev[sectionId].includes(value)
              ? prev[sectionId].filter((item) => item !== value)
              : [...prev[sectionId], value]
            : [value],
        };
        onFilterChange({ ...newFilters, price: priceRange });
        return newFilters;
      });
    },
    [onFilterChange, priceRange],
  );

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ ...selectedFilters, price: value });
  };

  const renderFilterContent = () => (
    <div className="space-y-4">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceChange([Number(e.target.value), priceRange[1]])
              }
              className="w-20"
              placeholder="Min"
            />
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceChange([priceRange[0], Number(e.target.value)])
              }
              className="w-20"
              placeholder="Max"
            />
          </div>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
          <div className="text-sm text-gray-500">
            Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </div>
        </div>
      </div>
      {filters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
          <div className="mt-4 space-y-4">
            {section.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  id={`${section.id}-${option.value}`}
                  checked={selectedFilters[section.id]?.includes(option.value)}
                  onCheckedChange={() =>
                    handleFilterChange(section.id, option.value)
                  }
                />
                <label
                  htmlFor={`${section.id}-${option.value}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
      <Sheet>
        <Sheet.Trigger asChild>
          <Button variant="outline" className="flex items-center lg:hidden">
            <span className="text-base font-medium text-gray-700">Filters</span>
            <CiFilter
              className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" className="w-full max-w-xs">
          <Sheet.Header>
            <Sheet.Title>Filters</Sheet.Title>
          </Sheet.Header>
          {renderFilterContent()}
        </Sheet.Content>
      </Sheet>

      <div className="hidden lg:block">{renderFilterContent()}</div>
    </div>
  );
};

const CategoriesTag = () => {
  const { categoryTag } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = useCallback((newFilters) => {
    setSelectedFilters(newFilters);
  }, []);

  const filters = useMemo(
    () => productFilter[categoryTag] || [],
    [categoryTag],
  );

  const filteredProducts = useMemo(() => {
    const products = productsByCategory[categoryTag] || [];
    return products.filter((product) =>
      Object.entries(selectedFilters).every(([filterId, selectedValues]) => {
        if (filterId === "price") {
          const [min, max] = selectedValues;
          return product.price >= min && product.price <= max;
        }
        return (
          selectedValues.length === 0 ||
          selectedValues.some((value) =>
            Array.isArray(product[filterId])
              ? product[filterId].includes(value)
              : product[filterId] === value,
          )
        );
      }),
    );
  }, [categoryTag, selectedFilters]);

  return (
    <MaxWidthWrapper className="h-full pt-0">
      <Sheet>
        <div className="mx-auto max-w-6xl">
          <div className="bg-white">
            <div className="border-b border-gray-200 pb-10 pt-10">
              <h2 className="text-2xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
                {categoryTag.replace(/-/g, " ")}
              </h2>
              <p className="mt-4 text-sm text-gray-500 sm:text-base">
                Explore our selection of fresh, locally-sourced products to add
                nutrition and flavor to your meals.
              </p>
            </div>

            <div className="py-6 sm:pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside className="sticky top-16 flex items-start pb-4 lg:col-span-1">
                <h2 className="sr-only">Filters</h2>

                <ProductFilter
                  categoryTag={categoryTag}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </aside>

              <main className="w-full lg:col-span-3">
                {filteredProducts.length > 0 ? (
                  <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-64 flex-col items-center justify-center">
                    <p className="text-xl font-semibold text-gray-600">
                      No products found
                    </p>
                    <p className="mt-2 text-gray-500">
                      Try adjusting your filters or search for something else.
                    </p>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </Sheet>
    </MaxWidthWrapper>
  );
};

// const Card = ({ product }) => {
//   return (
//     <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
//       <div className="w-full">
//         <ImageSlider images={product.imageSrc} />
//       </div>
//       <Link to={product.href}>
//         <div className="flex flex-1 flex-col space-y-2 p-4">
//           <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
//           <p className="text-sm text-gray-500">{product.description}</p>
//           <div className="flex flex-1 flex-col justify-end">
//             <p className="text-sm italic text-gray-500">{product.options}</p>
//             <div className="flex items-center justify-between">
//               <p className="text-base font-medium text-gray-900">
//                 {formatPrice(product.price)}
//               </p>
//               <AddToCartButton
//                 product={product}
//                 quantity={1}
//                 className="mt-2"
//                 size="icon"
//               />
//             </div>
//           </div>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {Object.entries(product).map(([key, value]) => {
//               if (Array.isArray(value) && key !== "imageSrc") {
//                 return value.map((tag, index) => (
//                   <span
//                     key={`${key}-${index}`}
//                     className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
//                   >
//                     {tag}
//                   </span>
//                 ));
//               }
//               return null;
//             })}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

export default CategoriesTag;

// import React, { useCallback, useMemo, useState } from "react";
// import MaxWidthWrapper from "@/components/max-width-wrapper";
// import { useParams, Link } from "react-router-dom";
// import { ChevronDownIcon, X } from "lucide-react";
// import { CiFilter } from "react-icons/ci";
// import { productFilter, productsByCategory } from "@/config";
// import ImageSlider from "@/components/image-slider";
// import { formatPrice } from "@/lib/utils";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Sheet from "../components/sheet";
// import AddToCartButton from "../components/cart/add-to-cart-button";

// const ProductFilter = ({ categoryTag, filters, onFilterChange }) => {
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [selectedFilters, setSelectedFilters] = useState({});

//   const handleFilterChange = useCallback(
//     (sectionId, value) => {
//       setSelectedFilters((prev) => {
//         const newFilters = {
//           ...prev,
//           [sectionId]: prev[sectionId]
//             ? prev[sectionId].includes(value)
//               ? prev[sectionId].filter((item) => item !== value)
//               : [...prev[sectionId], value]
//             : [value],
//         };
//         onFilterChange({ ...newFilters, price: priceRange });
//         return newFilters;
//       });
//     },
//     [onFilterChange, priceRange],
//   );

//   const handlePriceChange = (value) => {
//     setPriceRange(value);
//     onFilterChange({ ...selectedFilters, price: value });
//   };

//   const renderFilterContent = () => (
//     <div className="space-y-4">
//       <div className="border-b border-gray-200 pb-4">
//         <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
//         <div className="mt-4 space-y-4">
//           <div className="flex justify-between">
//             <Input
//               type="number"
//               value={priceRange[0]}
//               onChange={(e) =>
//                 handlePriceChange([Number(e.target.value), priceRange[1]])
//               }
//               className="w-20"
//               placeholder="Min"
//             />
//             <Input
//               type="number"
//               value={priceRange[1]}
//               onChange={(e) =>
//                 handlePriceChange([priceRange[0], Number(e.target.value)])
//               }
//               className="w-20"
//               placeholder="Max"
//             />
//           </div>
//           <Slider
//             min={0}
//             max={1000}
//             step={10}
//             value={priceRange}
//             onValueChange={handlePriceChange}
//           />
//           <div className="text-sm text-gray-500">
//             Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
//           </div>
//         </div>
//       </div>
//       {filters.map((section) => (
//         <div key={section.id} className="border-b border-gray-200 pb-4">
//           <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
//           <div className="mt-4 space-y-4">
//             {section.options.map((option) => (
//               <div key={option.value} className="flex items-center">
//                 <Checkbox
//                   id={`${section.id}-${option.value}`}
//                   checked={selectedFilters[section.id]?.includes(option.value)}
//                   onCheckedChange={() =>
//                     handleFilterChange(section.id, option.value)
//                   }
//                 />
//                 <label
//                   htmlFor={`${section.id}-${option.value}`}
//                   className="ml-3 text-sm text-gray-600"
//                 >
//                   {option.label}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="bg-white">
//       <Sheet>
//         <Sheet.Trigger asChild>
//           <Button variant="outline" className="flex items-center lg:hidden">
//             <span className="text-base font-medium text-gray-700">Filters</span>
//             <CiFilter
//               className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
//               aria-hidden="true"
//             />
//           </Button>
//         </Sheet.Trigger>
//         <Sheet.Content side="left" className="w-full max-w-xs">
//           <Sheet.Header>
//             <Sheet.Title>Filters</Sheet.Title>
//           </Sheet.Header>
//           {renderFilterContent()}
//         </Sheet.Content>
//       </Sheet>

//       <div className="hidden lg:block">{renderFilterContent()}</div>
//     </div>
//   );
// };

// const CategoriesTag = () => {
//   const { categoryTag } = useParams();
//   const [selectedFilters, setSelectedFilters] = useState({});

//   const handleFilterChange = useCallback((newFilters) => {
//     setSelectedFilters(newFilters);
//   }, []);

//   const filters = useMemo(
//     () => productFilter[categoryTag] || [],
//     [categoryTag],
//   );

//   const filteredProducts = useMemo(() => {
//     const products = productsByCategory[categoryTag] || [];
//     return products.filter((product) =>
//       Object.entries(selectedFilters).every(([filterId, selectedValues]) => {
//         if (filterId === "price") {
//           const [min, max] = selectedValues;
//           return product.price >= min && product.price <= max;
//         }
//         return (
//           selectedValues.length === 0 ||
//           selectedValues.some((value) =>
//             Array.isArray(product[filterId])
//               ? product[filterId].includes(value)
//               : product[filterId] === value,
//           )
//         );
//       }),
//     );
//   }, [categoryTag, selectedFilters]);

//   return (
//     <MaxWidthWrapper className="h-full pt-0">
//       <div className="mx-auto max-w-6xl">
//         <div className="bg-white">
//           <div className="border-b border-gray-200 pb-10 pt-10">
//             <h2 className="text-2xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
//               {categoryTag.replace(/-/g, " ")}
//             </h2>
//             <p className="mt-4 text-sm text-gray-500 sm:text-base">
//               Explore our selection of fresh, locally-sourced products to add
//               nutrition and flavor to your meals.
//             </p>
//           </div>

//           <div className="py-6 sm:pt-12 lg:grid lg:grid-cols-4 lg:gap-x-8">
//             <aside className="lg:col-span-1">
//               <ProductFilter
//                 categoryTag={categoryTag}
//                 filters={filters}
//                 onFilterChange={handleFilterChange}
//               />
//             </aside>

//             <main className="mt-6 lg:col-span-3 lg:mt-0">
//               {filteredProducts.length > 0 ? (
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {filteredProducts.map((product) => (
//                     <Card key={product.id} product={product} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex h-64 flex-col items-center justify-center">
//                   <p className="text-xl font-semibold text-gray-600">
//                     No products found
//                   </p>
//                   <p className="mt-2 text-gray-500">
//                     Try adjusting your filters or search for something else.
//                   </p>
//                 </div>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>
//     </MaxWidthWrapper>
//   );
// };

// const Card = ({ product }) => {
//   return (
//     <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
//       <div className="aspect-w-3 aspect-h-4 sm:aspect-none bg-gray-200 sm:h-96">
//         <ImageSlider images={product.imageSrc} />
//       </div>
//       <Link >
//         <div className="flex flex-1 flex-col space-y-2 p-4">
//           <h3 className="text-sm font-medium text-gray-900">
//             <span aria-hidden="true" className="absolute inset-0" />
//             {product.name}
//           </h3>
//           <p className="text-sm text-gray-500">{product.description}</p>
//           <div className="flex flex-1 flex-col justify-end">
//             <p className="text-sm italic text-gray-500">{product.options}</p>
//             <div className="flex items-center justify-between">
//               <p className="text-base font-medium text-gray-900">
//                 {formatPrice(product.price)}
//               </p>
//               <AddToCartButton
//                 product={product}
//                 quantity={1}
//                 className="mt-2"
//                 size="icon"
//               />
//             </div>
//           </div>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {Object.entries(product).map(([key, value]) => {
//               if (Array.isArray(value) && key !== "imageSrc") {
//                 return value.map((tag, index) => (
//                   <span
//                     key={`${key}-${index}`}
//                     className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
//                   >
//                     {tag}
//                   </span>
//                 ));
//               }
//               return null;
//             })}
//           </div>{" "}
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default CategoriesTag;
