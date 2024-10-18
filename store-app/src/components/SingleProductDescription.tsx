import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";

type SingleProductDescriptionProps = {
  description: string;
  brand: string;
  sku: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  createdAt: string;
  updatedAt: string;
};

type SingleSpecProps = {
  title: string;
  value: string | number;
};

function SingleSpec({ title, value }: SingleSpecProps) {
  return (
    <Box sx={{ width: "150px" }}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Typography fontWeight={100} variant="body2" gutterBottom>
        {value}
      </Typography>
    </Box>
  );
}

export default function SingleProductDescription({
  description,
  brand,
  sku,
  weight,
  height,
  width,
  depth,
  createdAt,
  updatedAt,
}: SingleProductDescriptionProps) {
  return (
    <Paper sx={{ width: "100%", p: 2, mb: 2, textAlign: "left" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{mb: 2}}>
        Description
      </Typography>
      <Typography variant="body2" gutterBottom>
        {description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" fontWeight={600} gutterBottom sx={{mb: 2}}>
        Specifications
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <SingleSpec title="Brand" value={(brand)?"brand": "No Brand"} />
        <SingleSpec title="SKU" value={sku} />
        <SingleSpec title="Weight" value={weight} />
        <SingleSpec
          title="Dimension"
          value={`${height} x ${width} x ${depth}`}
        />
        <SingleSpec title="Created At" value={createdAt} />
        <SingleSpec title="Updated At" value={updatedAt} />
      </Box>
    </Paper>
  );
}
