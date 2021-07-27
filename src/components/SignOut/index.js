import React from "react";
import { withFirebase } from "../Firebase/context";
import Button from "@material-ui/core/Button";

const SignOutBtn = ({ firebase }) => {
  return (
    <div>
      <Button type="button" variant="outlined" color="secondary" size="small" onClick={firebase.doSignOut}>
        Sign Out
      </Button>
    </div>
  );
};
//
export default withFirebase(SignOutBtn);
