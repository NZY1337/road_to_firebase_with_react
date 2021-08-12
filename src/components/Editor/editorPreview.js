import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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

const EditorPreview = ({ onHandlePostPreview, post, imgUploaded, postId }) => {
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

          {!imgUploaded && (
            <Typography gutterBottom={true} variant="h6" color="secondary">
              Upload your post cover.
            </Typography>
          )}

          {imgUploaded && (
            <Grid item container alignItems="center">
              <Typography gutterBottom={true} variant="h6" color="secondary" style={{ fontSize: "1rem" }}>
                Img Uploaded Successfully
              </Typography>

              <CheckCircleOutlineIcon color="secondary" />
            </Grid>
          )}

          {/* {postId && <img style={{ width: "100%", height: "300px" }} src={cover} />} */}

          <Button
            style={{ marginBottom: "1rem", marginTop: cover ? "1rem" : "0" }}
            disabled={disabled}
            variant="contained"
            component="label"
          >
            Blog Cover
            <input type="file" name="cover" onChange={(e) => onHandlePostPreview(e)} hidden />
          </Button>
        </Grid>

        <Grid md={5} item style={{ position: "relative" }}>
          <Paper elevation={1} square={false} style={{ padding: "1rem", backgroundColor: "#332E4C" }}>
            <Typography gutterBottom={true} variant="h6" component="h5" style={{ color: "#fff", marginBottom: "1rem" }}>
              Resigner's Compass uses cookies.
            </Typography>

            <Typography
              gutterBottom={true}
              component="small"
              style={{ color: "#fff", fontSize: "14px", marginBottom: "1.5rem" }}
            >
              With nearly 3000 mockup templates, Placeit has it all. iPhones, Samsungs, desktops, laptops, tablets, you
              name it, they've got it, and in nearly every position imaginable!
            </Typography>

            <br />

            <Button variant="outlined" color="secondary" style={{ marginTop: "1.5rem" }}>
              <Typography
                variant="h6"
                component="h6"
                color="secondary"
                style={{ textTransform: "none", fontSize: "16px" }}
              >
                View More
              </Typography>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EditorPreview;
