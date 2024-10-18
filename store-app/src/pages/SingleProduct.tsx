import React from "react";
import { useParams } from "react-router-dom";
import SingleProductDescription from "../components/SingleProductDescription";
import { Product } from "../types/Product";
import { fetchProductById } from "../APIs";
import { Box, Divider, Paper, Typography } from "@mui/material";
import StockChip from "../components/StockChip";
import Ratings from "../components/Ratings";
import SingleProductBasic from "../components/SingleProductBasic";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState({} as Product);

  React.useEffect(() => {
    fetchProductById(Number(id)).then((response) => setProduct(response.data));
  }, [id]);

  const getPreviousPrice = (
    currentPrice: number,
    discountPercentage: number
  ): number => {
    if (discountPercentage >= 100 || discountPercentage < 0) {
      throw new Error("Discount percentage must be between 0 and 100");
    }
    return parseFloat(
      (currentPrice / (1 - discountPercentage / 100)).toFixed(2)
    );
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SingleProductBasic
        thumbnail={product.thumbnail}
        images={product.images}
        title={product.title}
        rating={product.rating}
        reviews={product.reviews}
        category={product.category}
        tags={product.tags}
        price={product.price}
        qrCode={product.meta?.qrCode}
        stock={product.stock}
        shippingInformation={product.shippingInformation}
        warrantyInformation={product.warrantyInformation}
        returnPolicy={product.returnPolicy}
        discountPercentage={product.discountPercentage}
        availabilityStatus={product.availabilityStatus}
      />

      <SingleProductDescription
        description={product.description}
        brand={product.brand}
        sku={product.sku}
        weight={product.weight}
        height={product.dimensions?.height}
        width={product.dimensions?.width}
        depth={product.dimensions?.depth}
        createdAt={product.meta?.createdAt}
        updatedAt={product.meta?.updatedAt}
      />
    </Box>
  );
}

type ProductInfoProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
};


