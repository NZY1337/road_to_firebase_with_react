import React from "react";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";
import Todo from "./todo";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      todos: {},
      todo: "",
      test: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      todo: e.currentTarget.value,
    });
  };

  onAddTodo = (e) => {
    e.preventDefault();
    //! Get the pushed ID for specific value in firebase js
    this.props.firebase.db.ref(`todos/${this.state.user}`).push(this.state.todo);
    this.setState({ todo: "" });
  };

  fetchTodos = () => {
    const notes_db = this.props.firebase.db.ref("todos");

    notes_db.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let todos = snapshot.val();

        this.setState({
          todos: todos[this.state.user],
        });
      } else {
        this.setState({
          todos: {},
        });
      }
    });
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.uid });
      }
    });
    this.fetchTodos();
  }

  handleDelete = (id) => {
    const notesRef = this.props.firebase.db.ref("todos/" + this.state.user);
    notesRef.child(id).remove();
  };

  render() {
    const { todo, todos } = this.state;
    const isInvalid = todo === "";

    const renderTodos = () => {
      const collection = Object.keys(todos).map((key) => {
        return <Todo key={key} id={key} handleDelete={this.handleDelete} todo={todos[key]} />;
      });

      return collection;
    };

    return (
      <Container maxWidth="lg">
        <h1>Todo List</h1>

        <Grid container direction="row" alignItems="start" justify="space-between">
          <Grid md={4}>
            <TextField
              value={todo}
              onChange={this.handleChange}
              //   error={!!error}
              //   helperText={error}
              id="outlined-basic"
              fullWidth
              label="Enter Title"
              multiline
              variant="outlined"
            />
            <Button
              disabled={isInvalid}
              onClick={this.onAddTodo}
              variant="contained"
              color="primary"
              style={{ marginTop: "12.5px" }}
            >
              Add Todo
            </Button>
          </Grid>

          <Grid item md={4}>
            {renderTodos()}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withFirebase(Todos);
