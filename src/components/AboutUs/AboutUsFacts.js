import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RandomTitle from "../../utils/RandomTitle";

const AboutUsFacts = ({
  classes,
  title,
  subtitle,
  description1,
  description2,
  description3,
  ID,
  handleEditData,
  handleDeleteDataFromDb,
}) => {
  return (
    <Grid item md={6} style={{ padding: "1rem" }} className={`about-us-facts ${classes.aboutUsContent}`}>
      <RandomTitle title={title}>
        <Typography
          color="secondary"
          variant="body1"
          component="h6"
          style={{ color: "gray", fontStyle: "italic", marginBottom: "1.25rem" }}
        >
          {subtitle}
        </Typography>

        <Typography variant="body2" style={{ color: "white", marginBottom: ".5rem" }}>
          {description1 && description1}
        </Typography>

        <Typography variant="body2" style={{ color: "white", marginBottom: ".5rem" }}>
          {description2 && description2}
        </Typography>

        <Typography variant="body2" style={{ color: "white", marignBottom: ".5rem" }}>
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
      </RandomTitle>
    </Grid>
  );
};

export default AboutUsFacts;
