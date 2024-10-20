import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

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

const InformationModal: React.FC<ModalProps> = ({
  open,
  handleOpen,
  handleClose,
  title,
  status,
  icon,
}) => {
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
};

export default InformationModal;
