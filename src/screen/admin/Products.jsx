import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { productsByCategory } from "../../config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "../../lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import qs from "query-string";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    setPage(currentPage);

    const products = Object.values(productsByCategory)
      .flat()
      .slice((currentPage - 1) * 8, currentPage * 8);
    setAllProducts(products);
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

  return (
    <div className="space-y-4 p-6">
      <Table className="w-full">
        <TableCaption>A list of all products.</TableCaption>
        <TableHeader>
          <TableRow>
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
          {allProducts.map((product) => {
            const discountedPrice = product.discount
              ? product.price - (product.price * product.discount) / 100
              : product.price;

            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="truncate">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{Math.floor(Math.random() * 100)}</TableCell>
                <TableCell className="text-left">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell className="text-left">{product.discount}%</TableCell>
                <TableCell className="text-left">
                  {formatPrice(discountedPrice)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
  );
};

export default Products;
