import React, { useState } from 'react';
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
  StepContent
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const steps = ['Basic Information', 'Pricing & Stock', 'Dimensions & Shipping', 'Reviews', 'Media Upload', 'Summary'];

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
  const [activeStep, setActiveStep] = useState(0);
  const { control, handleSubmit, watch } = useForm<ProductForm>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      sku: '',
      weight: 0,
      width: 0,
      height: 0,
      depth: 0,
      warrantyInformation: '',
      shippingInformation: '',
      availabilityStatus: '',
      returnPolicy: '',
      images: [],
      thumbnail: ''
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: ProductForm) => {
    console.log('Form Submitted', data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <form>
                {index === 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Title" variant="outlined" fullWidth {...field} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Category" variant="outlined" fullWidth select {...field}>
                            <MenuItem value="beauty">Beauty</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Description" variant="outlined" fullWidth multiline rows={3} {...field} />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}

                {index === 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Price" type="number" variant="outlined" fullWidth {...field} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="discountPercentage"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Discount Percentage" type="number" variant="outlined" fullWidth {...field} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Rating" type="number" variant="outlined" fullWidth {...field} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="stock"
                        control={control}
                        render={({ field }) => (
                          <TextField label="Stock" type="number" variant="outlined" fullWidth {...field} />
                        )}
                      />
                    </Grid>
                  </Grid>
                )}

                {/* Add other steps (Dimensions, Shipping, Reviews, Media Upload, etc.) similarly */}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Next'}
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
