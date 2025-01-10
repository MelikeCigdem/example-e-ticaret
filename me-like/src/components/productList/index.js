"use client";
import React from "react";
import ProductCard from "../productCard";
import { Container } from "@mantine/core";

function ProductList({ products }) {
  return (
    <Container>
      <ProductCard products={products} />
    </Container>
  );
}

export default ProductList;
