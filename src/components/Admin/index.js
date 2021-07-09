import React from "react";
import "materialize-css";
import Container from "@material-ui/core/Container";

import { withFirebase } from "../Firebase";
import withLoader from "../../hoc/withLoader";

import { compose } from "recompose";

import UserList from "./userList";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  fetchUsers = () => {
    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });

      this.props.setLoaderState(this.state.loading);

      // stop interval if the users is not empty
      if (this.state.users.length !== 0) {
        clearInterval(this.props.loaderInterval);
      }
    });
  };

  componentDidMount() {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          loading: true,
        };
      },
      () => {
        this.props.setLoaderState(this.state.loading);
      }
    );

    this.fetchUsers();

    // this.interval = setInterval(this.props.displayLoader, 100);
  }

  componentWillUnmount() {
    this.props.firebase.users().off();

    // clearInterval(this.interval);
  }

  render() {
    const { users, loading } = this.state;
    return (
      <Container maxWidth="lg">
        <h1>Admin</h1>

        <UserList users={users} />
      </Container>
    );
  }
}

export default compose(withLoader, withFirebase)(AdminPage);
