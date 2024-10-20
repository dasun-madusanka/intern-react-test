import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
  gap: 2,
  p: 8,
};

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  title: string;
  status: string;
  icon: any;
};

export default function InformationModal({
  open,
  handleOpen,
  handleClose,
  title,
  status,
  icon,
}: ModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {icon}
          <Typography
            id="modal-modal-title"
            variant="h6"
            color={status == "success" ? "success" : "error"}
            component="h2"
          >
            {title}
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
