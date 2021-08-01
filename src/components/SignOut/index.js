import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase/context";
import Button from "@material-ui/core/Button";

import { SnackBarContext } from "../../utils/SnackBarContext";

const SignOutBtn = ({ firebase }) => {
  const history = useHistory();
  const { handleOpen } = useContext(SnackBarContext);
  return (
    <div>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        size="small"
        onClick={() => {
          history.push("/");
          firebase.doSignOut();
          handleOpen("success", "You successfully signed out!");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};
//
export default withFirebase(SignOutBtn);
