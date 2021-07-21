import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
const currencies = [
  {
    value: "blog",
    label: "blog",
  },
  {
    value: "news",
    label: "news",
  },
  {
    value: "articles",
    label: "articles",
  },
];

const EditorPreview = ({ onHandlePostPreview, value }) => {
  const { title, description, category } = value;
  const disabled = title === "" || description === "";

  return (
    <Grid container direction="column" spacing={1} style={{ margin: "1rem 0 2rem 0" }}>
      <Grid md={5} item>
        <TextField
          id="title"
          name="title"
          fullWidth
          margin="dense"
          label="Title"
          type="text"
          value={title}
          defaultValue={title}
          onChange={(e) => onHandlePostPreview(e)}
          variant="outlined"
        />

        <TextField
          fullWidth
          rows={3}
          multiline
          id="description"
          name="description"
          margin="dense"
          label="Description"
          type="text"
          value={description}
          onChange={(e) => onHandlePostPreview(e)}
          variant="outlined"
        />

        <TextField
          id="category"
          select
          name="category"
          label="Category"
          variant="outlined"
          margin="dense"
          size="small"
          value={category}
          onChange={(e) => onHandlePostPreview(e)}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item container direction="column" alignItems="flex-start">
        <Typography gutterBottom={true} variant="small" color="primary">
          Upload your post cover.
        </Typography>
        <Button disabled={disabled} variant="contained" component="label">
          Blog Cover
          <input type="file" name="cover" onChange={(e) => onHandlePostPreview(e)} hidden />
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditorPreview;
