import React from 'react';
import Chip from '@mui/material/Chip';

type StockChipProps = {
    inStock: string;
};

const StockChip: React.FC<StockChipProps> = ({ inStock }) => {
  return (
    <Chip label={inStock} color={(inStock == "In Stock")? "success" : "error"} />
  )
}

export default StockChip;
