import React from "react";
import { useHistory } from "react-router-dom";
import { withFirebase } from "../Firebase/context";
import Button from "@material-ui/core/Button";

const SignOutBtn = ({ firebase }) => {
  const history = useHistory();
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
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};
//
export default withFirebase(SignOutBtn);
