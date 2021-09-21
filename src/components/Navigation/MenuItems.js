import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export function MenuItems({ id, location, name }) {
  return (
    <NavLink
      exact
      activeStyle={{
        color: "aqua",
        textTransform: "underline",
      }}
      key={id}
      style={{ color: "#fff" }}
      to={location}
      color="inherit"
    >
      <MenuItem>
        <Typography variant="body1" component="p">
          {name}
        </Typography>
      </MenuItem>
    </NavLink>
  );
}

export default MenuItems;
