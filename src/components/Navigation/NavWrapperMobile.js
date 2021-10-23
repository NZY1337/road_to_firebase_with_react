import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TemporaryDrawer from "../../utils/Drawer/TemporaryDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiPaper-root": {
      backgroundColor: "#000!important",
    },

    "& .MuiTypography-root, & .MuiSvgIcon-root": {
      color: "#fff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavWrapperMobile({ authUser, authMenu, nonAuthMenu }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="tertiary">
        <Toolbar variant="dense">
          <TemporaryDrawer authMenu={authMenu} nonAuthMenu={nonAuthMenu} authUser={authUser} />
          <Typography variant="h6" color="inherit">
            Razvan Puricescu
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
