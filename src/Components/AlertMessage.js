import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertMessage = ({ message, show, variant, onClose }) => {
  return (
    <Snackbar
      open={show}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={variant} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
