import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  MenuItem,
  Grid,
  StepContent,
} from "@mui/material";
import { Product } from "../types/Product";
import ImageUpload from "../components/ImageUpload";
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    fetchProducts().then((response) => setProducts(response.data.products));
  }, [product]);

  const generateId = (): number => {
    const preId = products.length > 0 ? products[products.length - 1].id : 0;
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
      if (!product.returnPolicy)
        newErrors.returnPolicy = "Return Policy is required";
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

  const handleSubmit = () => {
    console.log("Product Submitted", product);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <ImageUpload
                        multiple={false}
                        onUploadComplete={handleThumbnail}
                        title="Select Thumbnail"
                        isError={!!errors.thumbnail}
                        errorTitle={errors.thumbnail}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ImageUpload
                        multiple={false}
                        onUploadComplete={handleQrCode}
                        title="Select QR Code"
                        isError={!!errors.qrCode}
                        errorTitle={errors.qrCode}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ImageUpload
                        multiple={true}
                        onUploadComplete={handleProductImages}
                        title="Select Images"
                      />
                    </Grid>
                  </Grid>
                )}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5">Product Added Successfully!</Typography>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddProduct;
