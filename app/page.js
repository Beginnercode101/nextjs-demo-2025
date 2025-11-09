"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FormComponent from "@/components/FormComponent";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [products, setProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const response = await fetch(" https://dummyjson.com/products");

      if (!response.ok) throw new Error("Failed");

      const allProduct = await response.json();
      setProduct(allProduct.products);
      setFilteredProduct(allProduct.products);

      console.log("-allProduct-", allProduct.products, allProduct.limit);
    } catch (error) {
      setProduct([]);
      setFilteredProduct([]);
      console.log("error", error);
    }
  };

  console.log("-products", products);
  console.log("-filteredProduct-", filteredProduct);

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleSearch = (text) => {
    const filterProduct = products.filter((p) =>
      p.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProduct(filterProduct);
  };

  return (
    <div>
      <Header />
      <FormComponent onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10">
        {filteredProduct.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center border border-gray-300 rounded-3xl hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <img alt={item.title} src={item.thumbnail} />
            <div>{item.title}</div>
            <div>${item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
