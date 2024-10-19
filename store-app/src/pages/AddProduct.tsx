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
import { useForm, Controller } from "react-hook-form";

const steps = [
  "Basic Product Details",
  "Pricing & Discounts",
  "Product Specifications",
  "Other Details",
  "Media Upload",
  "Finish",
];

interface ProductForm {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  images: string[];
  thumbnail: string;
}

const AddProduct: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: ProductForm) => {
    console.log("Form Submitted", data);
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

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      // onClick={index === steps.length - 1 ? handleSubmit() : handleNext}
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
        <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
          All steps completed - you're finished
        </Typography>
      )}
    </Box>
  );
};

export default AddProduct;
