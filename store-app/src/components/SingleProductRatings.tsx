import React from "react";
import Ratings from "./Ratings";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

type SingleProductRatingsProps = {
  rating: number;
  fiveStar: number;
  fourStar: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
  total: number;
};

export default function SingleProductRatings({
  rating,
  fiveStar,
  fourStar,
  threeStar,
  twoStar,
  oneStar,
  total
}: SingleProductRatingsProps) {
  return (
    <Paper sx={{ width: "100%", p: 2, mb: 2, display: "flex" }}>
      <Box
        sx={{ display: "flex", width: "30%", flexDirection: "column", gap: 2, justifyContent:"center" }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "end" }}
        >
          <Typography variant="h3">{rating}</Typography>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            / 5
          </Typography>
        </Stack>
        <Ratings rating={rating} />
      </Box>

      <Box>
        <SingleRatingCount rating={5} count={fiveStar} total={total} />
        <SingleRatingCount rating={4} count={fourStar} total={total} />
        <SingleRatingCount rating={3} count={threeStar} total={total} />
        <SingleRatingCount rating={2} count={twoStar} total={total} />
        <SingleRatingCount rating={1} count={oneStar} total={total} />
      </Box>
    </Paper>
  );
}

type RatingCountProps = {
  rating: number;
  count: number;
  total: number;
};

function SingleRatingCount({ rating, count, total }: RatingCountProps) {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Ratings rating={rating} />
      <RatingLevel count={count} total={total} />
        <Typography variant="body2" color="text.secondary">
            {count}
        </Typography>
    </Box>
  );
}

type RatingLevelProps = {
  count: number;
  total: number;
};

function RatingLevel({ count, total }: RatingLevelProps) {
  return <Slider sx={{width: 250}} value={count} max={total} size="small" />;
}
