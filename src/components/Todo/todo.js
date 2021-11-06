import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
    divider: {
      marginTop: ".75rem",
      marginBottom: "1rem",
    },
  }),
  { index: 1 }
);

const Todo = ({ id, todo, handleDelete, handleEdit }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} container>
          <li>{todo}</li>
        </Grid>
        <Grid item xs={3} className={classes.paper}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleEdit(id);
            }}
          >
            Edit
          </Button>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />
    </>
  );
};

export default Todo;
