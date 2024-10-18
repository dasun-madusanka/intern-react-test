import { Box, Divider, Paper, Typography } from "@mui/material";
import Ratings from "./Ratings";
import React from "react";

type SingleReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type SingleProductReviewsProps = {
  reviews: SingleReview[];
};

export default function SingleProductReviews({
  reviews,
}: SingleProductReviewsProps) {
  return (
    <Paper sx={{ width: "100%", p: 2, mb: 2, textAlign: "left" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
        Reviews
      </Typography>

      <Divider />
      {reviews.map((review, index) => (
        <SingleReviewCard key={index} {...review} />
      ))}
    </Paper>
  );
}

function SingleReviewCard({
  rating,
  comment,
  date,
  reviewerName,
  reviewerEmail,
}: SingleReview) {
  return (
    <Paper sx={{ maxWidth: "100%", p: 2, mb: 1 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Ratings rating={rating} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {reviewerName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {reviewerEmail}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>
            {date}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography variant="subtitle1" gutterBottom>
          {comment}
        </Typography>
      </Box>
    </Paper>
  );
}
