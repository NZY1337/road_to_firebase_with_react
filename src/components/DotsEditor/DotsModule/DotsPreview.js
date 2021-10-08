import React from "react";

import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";
import { Link } from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

export function DotsPreview({ dots }) {
  return (
    <Grid container justify="space-between" alignItems="flex-start" style={{ marginTop: "5rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Current Dots:</h2>

      <Grid container item lg={12} spacing={2}>
        {dots.map((dot) => {
          return (
            <Grid item lg={3} md={4} sm={4} style={{ height: "400px" }}>
              <Link
                href={dot.company}
                style={{
                  backgroundImage: `url(${dot.cover})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundBlendMode: "multiply",
                  borderRadius: "5px",
                  overflow: "hidden",
                  textAlign: "center",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,.5)",
                  color: "#fff",
                  height: "100% ",

                  textDecoration: "none",
                }}
              >
                <Typography variant="h6">{dot.description}</Typography>

                <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                  <EditTwoToneIcon color="default" style={{ fontSize: "20px", marginRight: "6px" }} />
                  <DeleteTwoToneIcon color="secondary" style={{ fontSize: "20px" }} />
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default DotsPreview;
