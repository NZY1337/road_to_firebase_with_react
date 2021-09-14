import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Categories from "../components/Blog/categories";
import ToggleButton from "./ToggleButton/ToggleButton";

import "../assets/scss/toggleCategories.scss";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    "& .MuiPopover-paper": {
      marginTop: "1rem",
      backgroundColor: "#D9AFD9",
      backgroundImage: "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)",
    },
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //   const decideWhichClass = anchorEl ? "v-shown" : "v-hidden";

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button> */}
      <ToggleButton ariaDescribedBy={id} toggle={anchorEl} handleOpenPopover={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.typography}>
          <Categories />
        </div>
      </Popover>
    </div>
  );
}
