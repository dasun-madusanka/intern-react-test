import React from 'react';
import Rating from '@mui/material/Rating';

type RatingProps = {
    rating: number;
};

export default function Ratings({ rating }: RatingProps) {
  const [value, setValue] = React.useState<number | null>(2);

  React.useEffect(() => {
    setValue(rating);
  }, [rating]);

  return (
    <Rating value={value} readOnly />
  )
}
