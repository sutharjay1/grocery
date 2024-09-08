import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { productsByCategory } from "../../config";
import { formatPrice } from "../../lib/utils";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    quantity: "",
    rating: "",
    imageSrc: [""],
    type: [],
    organic: [],
    color: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(currentPage);

    const products = Object.values(productsByCategory)
      .flat()
      .slice((currentPage - 1) * 8, currentPage * 8);

    setAllProducts(products);
    setSelectedProducts([]);
  }, [searchParams]);

  const handlePagination = (newPage) => {
    setPage(newPage);
    const url = qs.stringifyUrl(
      {
        url: `/admin`,
        query: { page: newPage, section: "products" },
      },
      { skipNull: true },
    );
    navigate(url, { replace: true });
  };

  const totalPages = Math.ceil(
    Object.values(productsByCategory).flat().length / 8,
  );

  const handleSelectProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product],
    );
  };

  const handleSelectAll = () => {
    setSelectedProducts((prev) =>
      prev.length === allProducts.length ? [] : [...allProducts],
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("imageSrc")) {
      const index = parseInt(name.split("-")[1]);
      setNewProduct((prev) => ({
        ...prev,
        imageSrc: prev.imageSrc.map((src, i) => (i === index ? value : src)),
      }));
    } else if (["type", "organic", "color"].includes(name)) {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImageInput = () => {
    setNewProduct((prev) => ({
      ...prev,
      imageSrc: [...prev.imageSrc, ""],
    }));
  };

  const handleRemoveImageInput = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      imageSrc: prev.imageSrc.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = () => {
    setIsDialogOpen(false);
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      discount: "",
      category: "",
      quantity: "",
      rating: "",
      imageSrc: [""],
      type: [],
      organic: [],
      color: [],
    });
  };

  useEffect(() => {
    console.log("Selected products:", selectedProducts);
  }, [selectedProducts]);

  return (
    <div className="flex flex-col space-y-4 p-6">
      <div className="w-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new product here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discount" className="text-right">
                  Discount
                </Label>
                <Input
                  id="discount"
                  name="discount"
                  type="number"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              {newProduct.imageSrc.map((src, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={`imageSrc-${index}`} className="text-right">
                    Image URL {index + 1}
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <Input
                      id={`imageSrc-${index}`}
                      name={`imageSrc-${index}`}
                      value={src}
                      onChange={handleInputChange}
                      className="flex-grow"
                    />
                    {index === newProduct.imageSrc.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAddImageInput}
                        className="ml-2"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                    {newProduct.imageSrc.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveImageInput(index)}
                        className="ml-2"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  name="type"
                  value={newProduct.type.join(", ")}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organic" className="text-right">
                  Organic
                </Label>
                <Input
                  id="organic"
                  name="organic"
                  value={newProduct.organic.join(", ")}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  name="color"
                  value={newProduct.color.join(", ")}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProduct}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex-grow">
          <Table className="min-w-sm w-full">
            <TableCaption>A list of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    checked={selectedProducts.length === allProducts.length}
                    onClick={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="text-left">MRP</TableHead>
                <TableHead className="text-left">Discount</TableHead>
                <TableHead className="text-left">Discounted Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts.length > 0 ? (
                allProducts.map((product) => {
                  const discountedPrice = product.discount
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;

                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="size-4 rounded border-gray-300"
                          checked={selectedProducts.some(
                            (item) => item.id === product.id,
                          )}
                          onClick={() => handleSelectProduct(product)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell className="truncate">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                      <TableCell className="text-left">
                        {formatPrice(product.price)}
                      </TableCell>
                      <TableCell className="text-left">
                        {product.discount}%
                      </TableCell>
                      <TableCell className="text-left">
                        {formatPrice(discountedPrice)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant={page === 1 ? "disabled" : "outline"}
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
            className="w-24"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Prev
          </Button>
          <div className="hidden space-x-2 px-8 text-center md:flex">
            {" "}
            {[...Array(6).keys()].map((i) => {
              const pageNumber = page <= 3 ? i + 1 : page - 3 + i;
              const totalPages = Math.ceil(
                Object.values(productsByCategory).flat().length / 8,
              );
              if (pageNumber > totalPages) return null;
              return (
                <Button
                  key={i}
                  size="icon"
                  variant={page === pageNumber ? "default" : "outline"}
                  onClick={() => handlePagination(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          <div className="flex md:hidden">
            Page {page} of {totalPages}
          </div>
          <Button
            variant={page === totalPages ? "disabled" : "outline"}
            onClick={() => handlePagination(page + 1)}
            disabled={page === totalPages}
            className="w-24"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
