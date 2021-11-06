import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const StyledButton = withStyles({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    textDecoration: "underline",
    padding: 0,
    borderRadius: 3,
    border: 0,
    color: "aqua",
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const useStyles = makeStyles(
  (theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: "rgba(0,0,0,.8)",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
  { index: 1 }
);

export default function TransitionsModal({ children, title }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledButton variant="text" size="medium" color="primary" type="button" onClick={handleOpen}>
        Forgot Password ?
      </StyledButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item md={3} lg={3} xs={5} container justify="center" style={{ position: "absolute", bottom: "15%", right: "10%" }}>
            <div className={classes.paper} style={{ width: "100%" }}>
              {children}
            </div>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
