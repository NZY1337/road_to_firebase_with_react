import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const EditorPreview = ({ onHandlePostPreview, value }) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Button variant="contained" component="label">
          Blog Cover
          <input type="file" name="cover" onChange={(e) => onHandlePostPreview(e)} hidden />
        </Button>
      </Grid>
      <Grid item>
        <TextField
          id="title"
          name="title"
          margin="dense"
          label="Title"
          type="text"
          onChange={(e) => onHandlePostPreview(e)}
          defaultValue={value}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default EditorPreview;
