import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const InternalAlert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props}></MuiAlert>;
};

const Alert = ({ open, handleClose, message, severity, ...props }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        key="sucesso"
        autoHideDuration={3000}
      >
        <InternalAlert onClose={handleClose} severity={severity}>
          {message}
        </InternalAlert>
      </Snackbar>
    </>
  );
};

export default Alert;
