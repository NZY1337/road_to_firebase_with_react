import React from "react";
import "materialize-css";

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
        loading: false,
      });

      this.props.setLoaderState(this.state.loading);

      // stop interval if the users is not empty
      if (this.state.users.length !== 0) {
        clearInterval(this.props.loaderInterval);
      }
    });
  };

  //! After calling setState the this.state variable is not immediately changed. so if you want to perform an action immediately
  //! after setting state on a state variable and then return a result, a callback will be useful
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

    this.storage = this.props.firebase.storage;

    // this.storage
    //   .ref("users/" + authUser.uid + "/profile.jpg")
    //   .getDownloadURL()
    //   .then((imgUrl) => {
    //     console.log(imgUrl);
    //     this.setState({
    //       avatar: imgUrl,
    //     });
    //   });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users } = this.state;
    return (
      <>
        <h1>Admin</h1>

        <UserList users={users} storage={this.storage} />
      </>
    );
  }
}

export default compose(withLoader, withFirebase)(AdminPage);
