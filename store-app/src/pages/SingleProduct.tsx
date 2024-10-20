import React from "react";
import { useParams } from "react-router-dom";
import SingleProductDescription from "../components/SingleProductDescription";
import CircularProgress from "@mui/material/CircularProgress";
import { Product } from "../types/Product";
import { fetchProductById } from "../APIs";
import { Box } from "@mui/material";
import SingleProductRatings from "../components/SingleProductRatings";
import SingleProductBasic from "../components/SingleProductBasic";
import SingleProductReviews from "../components/SingleProductReviews";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type RatingCounts = {
  [key: number]: number;
};

function countRatings(reviews: Review[] = []) {
  const ratingCounts: RatingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  };

  reviews.forEach((review) => {
    if (review.rating >= 0 && review.rating <= 5) {
      ratingCounts[review.rating]++;
    }
  });

  return ratingCounts;
}

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState({} as Product);
  const [loading, setLoading] = React.useState(true);

  const ratingCounts = countRatings(product.reviews);

  React.useEffect(() => {
    fetchProductById(Number(id))
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  }, [id]);

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <SingleProductBasic
            thumbnail={product.thumbnail}
            images={product.images}
            title={product.title}
            rating={product.rating}
            reviews={product.reviews}
            category={product.category}
            tags={product.tags}
            price={product.price}
            qrCode={product.meta?.qrCode}
            barcode={product.meta?.barcode}
            stock={product.stock}
            shippingInformation={product.shippingInformation}
            warrantyInformation={product.warrantyInformation}
            returnPolicy={product.returnPolicy}
            discountPercentage={product.discountPercentage}
            availabilityStatus={product.availabilityStatus}
            minimumOrderQuantity={product.minimumOrderQuantity}
          />

          <SingleProductDescription
            description={product.description}
            brand={product.brand}
            sku={product.sku}
            weight={product.weight}
            height={product.dimensions?.height}
            width={product.dimensions?.width}
            depth={product.dimensions?.depth}
            createdAt={product.meta?.createdAt}
            updatedAt={product.meta?.updatedAt}
          />

          <SingleProductRatings
            rating={product.rating}
            fiveStar={ratingCounts[5]}
            fourStar={ratingCounts[4]}
            threeStar={ratingCounts[3]}
            twoStar={ratingCounts[2]}
            oneStar={ratingCounts[1]}
            total={product.reviews?.length || 0}
          />

          <SingleProductReviews reviews={product.reviews || []} />
        </Box>
      )}
    </Box>
  );
}
