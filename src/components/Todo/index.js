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
      todo: null,
      todoId: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      todo: e.currentTarget.value,
    });
  };

  onAddTodo = () => {
    let { todoId } = this.state;
    if (todoId === "") {
      this.props.firebase.db.ref(`todos/${this.state.user}`).push(this.state.todo, (err) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ todo: "", todoId: "" });
        }
      });
    } else {
      // edit selected record
    }
  };

  fetchTodos = (user) => {
    const notes_db = this.props.firebase.db.ref(`todos/${user}`);

    notes_db.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let todos = snapshot.val();
        this.setState({
          todos: todos,
        });
      } else {
        this.setState({
          todos: {},
        });
      }
    });
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const notesRef = this.props.firebase.db.ref("todos/" + this.state.user);
      notesRef.child(id).remove();
    }
  };

  handleEdit = (id) => {};

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchTodos(user.uid);
        this.setState({ user: user.uid });
      }
    });
  }

  render() {
    const { todo, todos } = this.state;
    const isInvalid = todo === "";

    const renderTodos = () => {
      const collection = Object.keys(todos).map((key) => {
        return (
          <Todo key={key} id={key} handleEdit={this.handleEdit} handleDelete={this.handleDelete} todo={todos[key]} />
        );
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

// https://www.c-sharpcorner.com/article/react-crud-operation-with-firebase/
