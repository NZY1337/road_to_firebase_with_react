import React from "react";
import "materialize-css";
import { Container } from "@material-ui/core";
import { withFirebase } from "../Firebase";
import withLoader from "../../hoc/withLoader";

import { compose } from "recompose";

import UserList from "./userList";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      avatar: null,
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
      });

      this.props.setLoaderState(false);

      // stop interval if the users is not empty
      if (this.state.users.length !== 0) {
        clearInterval(this.props.loaderInterval);
      }
    });
  };

  //! After calling setState the this.state variable is not immediately changed. so if you want to perform an action immediately
  //! after setting state on a state variable and then return a result, a callback will be useful
  componentDidMount() {
    this.props.setLoaderState(true);

    this.fetchUsers();

    this.storage = this.props.firebase.storage;
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;
    return (
      <Container maxWidth="lg">
        <h1>Admin</h1>
        {this.props.loading && (
          <p>
            <b>{this.props.loadingText}</b>
          </p>
        )}
        <UserList users={users} />
      </Container>
    );
  }
}

export default compose(withLoader, withFirebase)(AdminPage);
