import React from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const container1 = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  backgroundBlendMode: "multiply",
  height: "65vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundImage:
    "url(https://images.pexels.com/photos/2506990/pexels-photo-2506990.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)",
};

const container2 = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};

const h6 = {
  color: "aqua",
};

const h3 = {
  color: "#fff",
};

const HeaderContainer = () => {
  return (
    <Container maxWidth="100%" style={container1}>
      <Container maxWidth="lg" style={container2}>
        <Grid container item direction="column" justifyContent="center" align="center">
          <Typography component="h2" variant="h2" style={h6}>
            Header Container
          </Typography>

          <Typography component="h6" variant="h6" style={h3}>
            simple blog
          </Typography>
        </Grid>
      </Container>
    </Container>
  );
};

export default HeaderContainer;
