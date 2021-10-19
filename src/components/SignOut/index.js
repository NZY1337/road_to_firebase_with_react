import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase/context";
import Button from "@material-ui/core/Button";

import { SnackBarContext } from "../../utils/SnackBarContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SignOutBtn = ({ firebase }) => {
  const history = useHistory();
  const { handleOpen } = useContext(SnackBarContext);
  return (
    <ExitToAppIcon
      style={{ color: "red" }}
      onClick={() => {
        history.push("/");
        firebase.doSignOut();
        handleOpen("success", "You successfully signed out!");
      }}
    />
  );
};
//
export default withFirebase(SignOutBtn);
