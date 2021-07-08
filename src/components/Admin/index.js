import React from "react";
import "materialize-css";
import Container from "@material-ui/core/Container";

import * as ROLES from "../../constants/roles";
import { withAuthorization } from "../Sesssion";

const AdminPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>Admin</h1>
      <p>Restricted area! Only users with the admin role are authorized.</p>
    </Container>
  );
};

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default withAuthorization(condition)(AdminPage);
