import React, { createContext, useContext, useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const SnackBarContext = createContext();

// create a context object
const SnackBarContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError("");
    setMsg("");
    setOpen(false);
  };

  const handleOpen = (error, msg) => {
    setError(error);
    setMsg(msg);
    setOpen(true);
  };

  //   provide the context obect with a value
  return (
    <SnackBarContext.Provider value={{ handleClose: handleClose, handleOpen: handleOpen }}>
      {children}

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error}>
          {msg}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export default SnackBarContextProvider;
