import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const UserList = ({ users }) => {
  return (
    <Grid container spacing={3}>
      {users.map((user) => {
        return (
          <Grid item key={user.uid} lg={4}>
            <Paper>
              <Card>
                <CardActionArea>
                  <CardMedia
                    image="https://images.pexels.com/photos/4982882/pexels-photo-4982882.jpeg?cs=srgb&dl=pexels-nadi-lindsay-4982882.jpg&fm=jpg"
                    title="Contemplative Reptile"
                    style={{ height: 140 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.username}
                    </Typography>
                    <Typography variant="body2" spacing={10} component="p">
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="small">
                      uuid: {user.uid}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserList;
