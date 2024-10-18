import React from 'react';
import Chip from '@mui/material/Chip';

type StockChipProps = {
    inStock: string;
};

export default function StockChip({ inStock }: StockChipProps) {
  return (
    <Chip label={inStock} color={(inStock == "In Stock")? "success" : "error"} />
  )
}
