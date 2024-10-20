import React from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { CircularProgress, Divider, Typography } from "@mui/material";
import { Product } from "../types/Product";
import { fetchProducts } from "../APIs";
import ProductCard from "../components/ProductCard";
import { usePagination } from "../context/PaginationContext";

const Products: React.FC = () => {
  const [products, setProducts] = React.useState([{}] as Product[]);
  const [loading, setLoading] = React.useState(true);
  const [productCount, setProductCount] = React.useState(0);

  const { skip, setSkip } = usePagination();

  React.useEffect(() => {
    fetchProducts(10, skip).then((response) => {
      setProducts(response.data.products);
      setProductCount(response.data.total);
      setLoading(false);
    });
  }, [skip]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSkip((value - 1) * 10);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        color="secondary"
        variant="h5"
        sx={{ textAlign: "left ", mt: 2, mb: 2, fontWeight: 700 }}
      >
        All Products
      </Typography>
      <Divider />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            mt: 2,
          }}
        >
          {products.map((product) => (
            <ProductCard pid={product.id} />
          ))}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Pagination
          count={Math.ceil(productCount / 10)}
          onChange={handlePageChange}
          color="primary"
          page={Math.floor(skip / 10) + 1}
        />
      </Box>
    </Box>
  );
}

export default Products;
