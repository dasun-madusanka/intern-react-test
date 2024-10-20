import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import Ratings from "./Ratings";
import { fetchProductById, deleteProduct } from "../APIs";
import { Product } from "../types/Product";
import InformationModal from "./InformationModal";

type ProductCardProps = {
  pid: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ pid }) => {
  const navigate = useNavigate();
  const [product, setProduct] = React.useState({} as Product);
  const [loading, setLoading] = React.useState(true);
  const [hover, setHover] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalStatus, setModalStatus] = React.useState("");
  const [modalIcon, setModalIcon] = React.useState(<ThumbUpIcon />);

  React.useEffect(() => {
    fetchProductById(pid).then((response) => {
      setProduct(response.data);
      setLoading(false);
    });
  }, [pid]);

  const handleProductClick = () => {
    navigate(`/products/${pid}`);
  };

  const handleDelete = () => {
    console.log("Delete product with ID:", pid);
    deleteProduct(pid)
      .then(() => {
        console.log("Product deleted successfully.");
        setOpenModal(true);
        setModalTitle("Product Deleted Successfully");
        setModalIcon(<ThumbUpIcon />);
        setModalStatus("success");
      })
      .catch((error) => {
        setOpenModal(true);
        setModalTitle("Can't Delete Product");
        setModalIcon(<ThumbDownIcon />);
        setModalStatus("error");
        console.error("Error deleting product:", error);
      });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
  };

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ width: 250, height: 300, position: "relative" }}
    >
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
      {hover && (
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
          onClick={handleDelete}
        >
          <DeleteIcon color="error" />
        </IconButton>
      )}
      <InformationModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        title={modalTitle}
        status={modalStatus}
        icon={modalIcon}
      />
    </Card>
  );
};

export default ProductCard;
