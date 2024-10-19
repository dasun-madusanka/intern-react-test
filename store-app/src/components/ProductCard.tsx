import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CircularProgress from "@mui/material/CircularProgress";
import Ratings from "./Ratings";
import { fetchProductById } from "../APIs";
import { Product } from "../types/Product";
import { Box } from "@mui/material";

type ProductCardProps = {
  pid: number;
};

export default function ProductCard({ pid }: ProductCardProps) {
  const navigate = useNavigate();
  const [product, setProduct] = React.useState({} as Product);
  const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   fetchProductById(pid).then((response) => setProduct(response.data));
  // }, [pid]);

  React.useEffect(() => {
    fetchProductById(pid).then((response) => {
      setProduct(response.data);
      setLoading(false);
    });
  }, [pid]);

  const handleProductClick = () => {
    navigate(`/products/${pid}`);
  };

  return (
    <Card sx={{ width: 250, height: 300 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <CardActionArea onClick={handleProductClick} sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            sx={{ height: "40%" }}
            image={product.thumbnail}
            alt={product.title}
          />
          <CardContent
            sx={{
              display: "flex",
              height: "50%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              textAlign={"left"}
              variant="subtitle1"
              component="div"
            >
              {product.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                textAlign={"left"}
                variant="h6"
                color="secondary"
                sx={{}}
              >
                {product.price} $
              </Typography>
              <Typography
                textAlign={"left"}
                variant="body2"
                color="text.secondary"
                sx={{}}
              >
                {product.discountPercentage} % off
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Ratings rating={product.rating} />
              <Typography
                textAlign={"left"}
                variant="body2"
                color="text.secondary"
                sx={{}}
              >
                ( {product.rating} )
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}
