import React from 'react';
import Rating from '@mui/material/Rating';

type RatingProps = {
    rating: number;
};

const Ratings: React.FC<RatingProps> = ({ rating }) => {
  const [value, setValue] = React.useState<number | null>(2);

  React.useEffect(() => {
    setValue(rating);
  }, [rating]);

  return (
    <Rating value={value} readOnly />
  )
}

export default Ratings;
