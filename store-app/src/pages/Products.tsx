import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { Product } from "../types/Product";
import { fetchProducts } from "../APIs";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = React.useState([{}] as Product[]);

  React.useEffect(() => {
    // fetchProducts().then((response: any) => setProducts(response));
    fetchProducts().then((response) => setProducts(response.data.products));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <ProductCard pid={product.id} />
        ))}
      </Box>
    </Box>
  );
}
