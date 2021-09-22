import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.MuiPaper-root": {
      backgroundColor: "rgba(0,0,0, 1)",
      transition: "background-color .5s",
    },

    "& .MuiMenu-list": {
      backgroundColor: "black",

      "& a": {
        textDecoration: "none",
      },
    },
  },
}));

export function Dropdown({ submenu, submenuName, defaultColorToDrowdown }) {
  console.log(defaultColorToDrowdown);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderSublinks = () => {
    return submenu.map((menu) => {
      const { location, name, id } = menu;
      return (
        <NavLink
          onClick={handleClose}
          exact
          activeStyle={{
            color: "aqua",
            textDecoration: "none",
          }}
          key={id}
          style={{ color: "#fff" }}
          to={location}
          color="inherit"
        >
          <MenuItem>
            <Typography variant="body1" component="p" style={{ color: "#fff", fontWeight: "bold" }}>
              {name}
            </Typography>
          </MenuItem>
        </NavLink>
      );
    });
  };

  return (
    <div>
      <Button
        style={{ color: defaultColorToDrowdown ? "aqua" : "#fff", fontSize: "inherit", textTransform: "none" }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.root}
      >
        {submenuName}
      </Button>
      <Menu
        id="simple-menu"
        className={classes.root}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderSublinks()}
      </Menu>
    </div>
  );
}

export default Dropdown;
