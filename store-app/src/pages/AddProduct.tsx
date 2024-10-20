import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Grid,
  StepContent,
  Divider,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Product } from "../types/Product";
import ImageUpload from "../components/ImageUpload";
import InformationModal from "../components/InformationModal";
import { addProduct, fetchProducts } from "../APIs";

const steps = [
  "Basic Product Details",
  "Pricing & Discounts",
  "Product Specifications",
  "Other Details",
  "Media Upload",
  "Finish",
];

const AddProduct: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const [modalIcon, setModalIcon] = useState(<ThumbUpIcon />);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: "",
    sku: "",
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [
      {
        rating: 0,
        comment: "",
        date: "",
        reviewerName: "",
        reviewerEmail: "",
      },
    ],
    returnPolicy: "",
    minimumOrderQuantity: 0,
    meta: {
      createdAt: "",
      updatedAt: "",
      barcode: "",
      qrCode: "",
    },
    images: [],
    thumbnail: "",
  });

  React.useEffect(() => {
    fetchProducts(1, productCount - 1)
      .then((response) => {
        setProducts(response.data.products);
        setProductCount(response.data.total);
      })
      .catch((error) => {
        console.error("Error Message: " + error);
      });
  }, [product, productCount]);

  const generateId = (): number => {
    const preId = productCount > 0 ? products[0].id : 0;
    return preId + 1;
  };

  React.useEffect(() => {
    setProduct({ ...product, id: generateId() });
  }, [products]);

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 0) {
      if (!product.title) newErrors.title = "Title is required";
      if (!product.category) newErrors.category = "Category is required";
      if (!product.sku) newErrors.sku = "SKU is required";
      if (product.stock <= 0) newErrors.stock = "Stock must be greater than 0";
    }

    if (step === 1) {
      if (product.price <= 0) newErrors.price = "Price must be greater than 0";
      if (product.discountPercentage < 0)
        newErrors.discountPercentage =
          "Discount Percentage must be greater than 0";
    }

    if (step === 2) {
      if (product.dimensions.width < 0)
        newErrors.width = "Width must be greater than 0";
      if (product.dimensions.height < 0)
        newErrors.height = "Height must be greater than 0";
      if (product.dimensions.depth < 0)
        newErrors.depth = "Depth must be greater than 0";
      if (product.weight < 0)
        newErrors.weight = "Weight must be greater than 0";
    }

    if (step === 3) {
      if (product.minimumOrderQuantity <= 0)
        newErrors.minimumOrderQuantity =
          "Minimum Order Quantity must be greater than 0";
    }

    if (step === 4) {
      if (!product.thumbnail)
        newErrors.thumbnail = "Thumbnail image is required";
      if (!product.meta.qrCode) newErrors.qrCode = "QR Code image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductImages = (urls: string[]) => {
    console.log("Image URLs", urls);
    setProduct({ ...product, images: urls });
  };

  const handleThumbnail = (url: string[]) => {
    setProduct({ ...product, thumbnail: url[0] });
  };

  const handleQrCode = (url: string[]) => {
    setProduct({
      ...product,
      meta: { ...product.meta, qrCode: url[0] },
    });
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    addProduct(product)
      .then(() => {
        setModalIcon(<ThumbUpIcon />);
        setModalStatus("success");
        setModalTitle("Product Added Successfully");
        setOpenModal(true);
      })
      .catch((error) => {
        console.error("Error Message: " + error);
        setModalIcon(<ThumbDownIcon />);
        setModalStatus("error");
        setModalTitle("Error in Adding Product");
        setOpenModal(true);
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
    <Box sx={{ width: "100%" }}>
      <Typography
        color="secondary"
        variant="h5"
        sx={{ textAlign: "left ", mt: 2, mb: 2, fontWeight: 700 }}
      >
        Add New Product
      </Typography>
      <Divider />
      <Stepper sx={{ mt: 2 }} activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form>
                {index === 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        error={!!errors.title}
                        helperText={errors.title}
                        value={product.title}
                        required
                        onChange={(e) =>
                          setProduct({ ...product, title: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Category"
                        name="category"
                        error={!!errors.category}
                        helperText={errors.category}
                        value={product.category}
                        required
                        onChange={(e) =>
                          setProduct({ ...product, category: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Brand"
                        name="brand"
                        value={product.brand}
                        onChange={(e) =>
                          setProduct({ ...product, brand: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="SKU"
                        name="sku"
                        error={!!errors.sku}
                        helperText={errors.sku}
                        value={product.sku}
                        required
                        onChange={(e) =>
                          setProduct({ ...product, sku: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Tags"
                        name="tags"
                        value={product.tags}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            tags: e.target.value.split(","),
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Stock Count"
                        name="stock"
                        type="number"
                        error={!!errors.stock}
                        helperText={errors.stock}
                        value={product.stock}
                        required
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            stock: parseInt(e.target.value),
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        required
                        value={product.description}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            description: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}

                {index === 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        error={!!errors.price}
                        helperText={errors.price}
                        required
                        value={product.price}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            price: parseInt(e.target.value),
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Discount Percentage"
                        name="discountPercentage"
                        type="number"
                        value={product.discountPercentage}
                        error={!!errors.discountPercentage}
                        helperText={errors.discountPercentage}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            discountPercentage: parseInt(e.target.value),
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}

                {index === 2 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Width"
                        name="width"
                        type="number"
                        error={!!errors.width}
                        helperText={errors.width}
                        value={product.dimensions.width}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            dimensions: {
                              ...product.dimensions,
                              width: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Height"
                        name="height"
                        type="number"
                        error={!!errors.height}
                        helperText={errors.height}
                        value={product.dimensions.height}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            dimensions: {
                              ...product.dimensions,
                              height: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Depth"
                        name="depth"
                        type="number"
                        error={!!errors.depth}
                        helperText={errors.depth}
                        value={product.dimensions.depth}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            dimensions: {
                              ...product.dimensions,
                              depth: parseInt(e.target.value),
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Weight"
                        name="weight"
                        type="number"
                        error={!!errors.weight}
                        helperText={errors.weight}
                        value={product.weight}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            weight: parseInt(e.target.value),
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}

                {index === 3 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Shipping Information"
                        name="shippingInformation"
                        value={product.shippingInformation}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            shippingInformation: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Warranty Information"
                        name="warrentyInformation"
                        value={product.warrantyInformation}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            warrantyInformation: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Return Policy"
                        name="returnPolicy"
                        value={product.returnPolicy}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            returnPolicy: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Barcode Value"
                        name="barcode"
                        value={product.meta.barcode}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            meta: {
                              ...product.meta,
                              barcode: e.target.value,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Minimum Order Quantity"
                        name="minimumOrderQuantity"
                        type="number"
                        error={!!errors.minimumOrderQuantity}
                        helperText={errors.minimumOrderQuantity}
                        value={product.minimumOrderQuantity}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            minimumOrderQuantity: parseInt(e.target.value),
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                )}

                {index === 4 && (
                  <>
                    <Typography textAlign={"left"} variant="body2" sx={{mb: 2}}>
                      After Selecting Images, Hit "Upload".
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <ImageUpload
                          multiple={false}
                          onUploadComplete={handleThumbnail}
                          title="Select Thumbnail"
                          isError={!!errors.thumbnail}
                          errorTitle={errors.thumbnail}
                          defaultImages={[product.thumbnail]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ImageUpload
                          multiple={false}
                          onUploadComplete={handleQrCode}
                          title="Select QR Code"
                          isError={!!errors.qrCode}
                          errorTitle={errors.qrCode}
                          defaultImages={[product.meta.qrCode]}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageUpload
                          multiple={true}
                          onUploadComplete={handleProductImages}
                          title="Select Images"
                          defaultImages={product.images}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                    mt: 2,
                  }}
                >
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, color: "text.secondary" }}
                    >
                      Back
                    </Button>
                  </Box>
                </Box>
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Form Filled Successfully!</Typography>
          <Button onClick={handleReset}>Edit Again</Button>
          <Button
            startIcon={<PublishIcon />}
            onClick={handleSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      )}
      <InformationModal
        open={openModal}
        handleOpen={handleOpenModal}
        handleClose={handleCloseModal}
        title={modalTitle}
        status={modalStatus}
        icon={modalIcon}
      />
    </Box>
  );
};

export default AddProduct;
