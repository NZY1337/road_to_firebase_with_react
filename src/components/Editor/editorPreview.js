import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";

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

// cover, title, description

const EditorPreview = ({ onHandlePostPreview, post, imgUploaded, imgCoverName }) => {
  const { title, description, category, cover } = post;
  const disabled = title === "" || description === "";

  return (
    <>
      <Grid container justify="space-between" align="flex-start" direction="row" spacing={1}>
        <Grid md={5} item>
          <TextField
            id="title"
            name="title"
            fullWidth
            margin="dense"
            label="Title"
            type="text"
            value={title}
            // defaultValue={title}
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

          <div>
            <Typography gutterBottom={true} variant="h6" color="secondary">
              {!imgUploaded && "Upload Your Post Cover"}
              {imgUploaded && `${imgCoverName} being uploaded...`}
              {imgUploaded && <CircularProgress color="secondary" size={20} />}
            </Typography>

            <Typography>
              {post.cover && <img src={post.cover} style={{ height: "300px", objectFit: "cover" }} />}
            </Typography>

            <Button style={{ marginBottom: "1rem" }} disabled={disabled} variant="contained" component="label">
              Blog Cover
              <input
                type="file"
                accept="file_extension|audio/*|video/*|image/*|media_type"
                name="cover"
                onChange={(e) => onHandlePostPreview(e)}
                hidden
              />
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default EditorPreview;
