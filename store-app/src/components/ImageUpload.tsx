import React, { useState, useEffect } from "react";
import { storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type ImageUploadProps = {
  multiple?: boolean;
  onUploadComplete: (urls: string[]) => void;
  title: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  multiple = false,
  onUploadComplete,
  title,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFile = files[0];
      if (multiple) {
        // Allow multiple images
        setImages((prevImages) => [...prevImages, selectedFile]);
        setPreviewURLs((prevPreviews) => [
          ...prevPreviews,
          URL.createObjectURL(selectedFile),
        ]);
      } else {
        setImages([selectedFile]);
        setPreviewURLs([URL.createObjectURL(selectedFile)]);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewURLs((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleUpload = () => {
    if (images.length === 0) return;

    setUploading(true);
    setErrorMessage("");

    const promises = images.map((image) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              resolve(downloadURL)
            );
          }
        );
      });
    });

    Promise.all(promises)
      .then((urls) => {
        setImageURLs((prevURLs) => [...prevURLs, ...urls]);
        onUploadComplete(urls);
        setUploading(false);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        setErrorMessage("Failed to upload images. Please try again.");
        setUploading(false);
      });
  };

  useEffect(() => {
    return () => {
      previewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewURLs]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        border: "2px dotted #fff",
        borderRadius: 5,
        borderColor: "primary",
        alignItems: "center",
        flexDirection: "column",
        p: 1,
      }}
    >
      <Box sx={{ width: "75%" }}>
        {previewURLs.length > 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {previewURLs.map((url, index) => (
              <Card
                sx={{ maxWidth: 100, margin: 1, position: "relative" }}
                key={index}
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={url}
                  alt={`Preview ${index + 1}`}
                />
                {hoveredImageIndex === index && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 10,
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "lightgray" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Card>
            ))}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component="label"  sx={{ mb: 2, width: 180, color: "text.secondary" }}>
          {title}
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*"
          />
        </Button>

        <Button
          variant="outlined"
          onClick={handleUpload}
          color="secondary"
          disabled={images.length === 0 || uploading}
          sx={{ mb: 2 }}
          startIcon={<CloudUploadIcon />}
        >
          {uploading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
      </Box>

      {imageURLs.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="success">
            Images Uploaded Successfully!
          </Typography>
        </Box>
      )}

      {errorMessage && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" color="error">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
