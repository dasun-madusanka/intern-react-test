import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Ratings from "./Ratings";
import StockChip from "./StockChip";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const ListItemStyles = {
  width: "100%",
  display: "flex",
  gap: 3,
  mb: 2,
  alignItems: "center",
};

type ReviewProps = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type SingleProductBasicProps = {
  thumbnail: string;
  images: string[];
  title: string;
  rating: number;
  reviews: ReviewProps[];
  category: string;
  tags: string[];
  price: number;
  qrCode: string;
  stock: number;
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  discountPercentage: number;
  availabilityStatus: string;
};

export default function SingleProductBasic({
  thumbnail,
  images,
  title,
  rating,
  reviews,
  category,
  tags,
  price,
  qrCode,
  stock,
  shippingInformation,
  warrantyInformation,
  returnPolicy,
  discountPercentage,
  availabilityStatus,
}: SingleProductBasicProps) {
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
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        p: 2,
        mb: 2,
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "30%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={thumbnail} alt={title} style={{ width: "100%" }} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 1,
              mt: 2,
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {images &&
              images.map((image) => (
                <img
                  src={image}
                  alt={title}
                  style={{ width: 70, height: 70 }}
                />
              ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "30%" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: 3,
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h5" textAlign={"left"} fontWeight={500}>
            {title}
          </Typography>
          <StockChip inStock={availabilityStatus} />
        </Box>
        <Box sx={ListItemStyles}>
          <Ratings rating={rating} />
          <Typography variant="body2" color="text.secondary">
            {/* ({product.reviews.length} reviews) */}
          </Typography>
        </Box>
        <Box sx={ListItemStyles}>
          <Typography variant="subtitle2" color="text.secondary">
            Category :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {category}
          </Typography>
        </Box>
        <Box sx={ListItemStyles}>
          <Typography variant="subtitle2" color="text.secondary">
            Tags :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {product.tags.join(", ")} */}
          </Typography>
        </Box>

        <Divider />

        <Typography
          color="primary"
          textAlign={"left"}
          fontWeight={500}
          variant="h4"
          mt={2}
        >
          {price} $
        </Typography>

        <Box sx={ListItemStyles}>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through" }}
            color="text.secondary"
          >
            {getPreviousPrice(price, discountPercentage)} $
          </Typography>

          <Typography variant="body2" color="success">
            {discountPercentage} % off
          </Typography>
        </Box>
        <Box sx={ListItemStyles}>
          <img src={qrCode} alt={title} style={{ height: 70 }} />
        </Box>
      </Box>

      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <ProductInfo
          title="Stock Information"
          icon={<Inventory2Icon />}
          value={stock + "Available"}
        />
        <ProductInfo
          title="Shipping Information"
          icon={<LocalShippingIcon />}
          value={shippingInformation}
        />
        <ProductInfo
          title="Warranty Information"
          icon={<VerifiedUserIcon />}
          value={warrantyInformation}
        />
        <ProductInfo
          title="Return Policy"
          icon={<AutorenewIcon />}
          value={returnPolicy}
        />
      </Box>
    </Paper>
  );
}

type ProductInfoProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
};

function ProductInfo({ title, icon, value }: ProductInfoProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 0.5,
      }}
    >
      <Typography textAlign={"left"} variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Box sx={ListItemStyles}>
        {icon}
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
