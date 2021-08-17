import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function AboutUsFacts({
  title,
  subtitle,
  description1,
  description2,
  description3,
  ID,
  handleEditData,
  handleDeleteDataFromDb,
}) {
  return (
    <Grid md={6} style={{ padding: "1rem" }}>
      <Typography color="primary" variant="h4" component="h4" style={{ color: "aqua", marginBottom: "1rem" }}>
        {title}
      </Typography>

      <Typography color="primary" variant="body" component="p" style={{ color: "white" }}>
        {subtitle}
      </Typography>

      <Typography variant="body2" style={{ color: "white", marginBottom: ".5rem" }}>
        {description1 && description1}
      </Typography>

      <Typography variant="body2" style={{ color: "white", marginBottom: ".5rem" }}>
        {description2 && description2}
      </Typography>

      <Typography variant="body2" style={{ color: "white" }}>
        {description3 && description3}
      </Typography>

      <div style={{ marginBottom: "2rem", marginTop: "1rem" }}>
        <Button
          variant="contained"
          style={{ marginRight: "1rem" }}
          size="small"
          id={ID}
          onClick={() => handleEditData(ID)}
        >
          Edit
        </Button>

        <Button variant="contained" color="secondary" size="small" id={ID} onClick={handleDeleteDataFromDb}>
          Remove
        </Button>
      </div>
    </Grid>
  );
}
