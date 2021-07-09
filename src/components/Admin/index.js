import React from "react";
import "materialize-css";
import Container from "@material-ui/core/Container";

import * as ROLES from "../../constants/roles";
import { withFirebase } from "../Firebase";

import UserList from "./userList";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.loaderRef = React.createRef();

    this.state = {
      loading: false,
      users: [],
      counter: 0,
      loadingText: "Loading",
    };
  }

  displayLoader = () => {
    console.log("test");
    if (this.state.counter === 3) {
      this.setState((prevState) => {
        return {
          ...prevState,
          counter: -1,
          loadingText: "Loading ",
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          loadingText: (prevState.loadingText += " ."),
        };
      });
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        counter: prevState.counter + 1,
      };
    });
  };

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

      // stop interval if the users is not empty
      if (this.state.users.length !== 0) {
        clearInterval(this.interval);
      }
    });
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.fetchUsers();

    this.interval = setInterval(this.displayLoader, 100);
  }

  componentWillUnmount() {
    this.props.firebase.users().off();

    clearInterval(this.interval);
  }

  render() {
    const { users, loading } = this.state;

    return (
      <Container maxWidth="lg">
        <h1>Admin</h1>

        {loading && (
          <p>
            <b>{this.state.loadingText}</b>
          </p>
        )}

        <UserList users={users} />
      </Container>
    );
  }
}

export default withFirebase(AdminPage);
