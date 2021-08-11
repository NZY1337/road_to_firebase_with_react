import React from "react";
import TextField from "@material-ui/core/TextField";

import withLoader from "../../hoc/withLoader";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../Firebase";
import Todo from "./todo";

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      user: null,
      todos: {},
      todo: "",
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
      this.props.firebase.db
        .ref(`todos/${this.state.user}`)
        .child(this.state.todoId)
        .set(this.state.todo, (err) => {
          if (err) {
            console.log(err);
          } else {
            this.setState({ todo: "", todoId: "" });
          }
        });
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
        this.props.setLoaderState(false);
      } else {
        this.setState({
          todos: {},
        });
      }
    });

    if (this.state.todos.length !== 0) {
      clearInterval(this.props.loaderInterval);
    }
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const notesRef = this.props.firebase.db.ref("todos/" + this.state.user);
      notesRef.child(id).remove();

      this.setState({ todo: "" });
    }
  };

  handleEdit = (id) => {
    this.setState({ todoId: id });

    const todo = this.props.firebase.db.ref(`todos/${this.state.user}/${id}`);

    todo.on("value", (snapshot) => {
      const todo = snapshot.val();
      this.setState({
        todo,
      });
    });
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.fetchTodos(user.uid);
        this.setState({ user: user.uid });
      }
    });

    this.props.setLoaderState(true);
  }

  render() {
    const { todo, todos } = this.state;
    const isInvalid = todo === "";

    const btnText = this.state.todoId ? "Edit Todo" : "Add Todo";

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

        <Grid container direction="row" alignItems="flex-start" justify="space-between">
          <Grid item md={4}>
            <TextField
              ref={this.inputRef}
              value={todo}
              autoFocus={false}
              onChange={this.handleChange}
              id="outlined-basic"
              fullWidth
              label="Enter Title"
              variant="outlined"
            />
            <Button
              disabled={isInvalid}
              onClick={this.onAddTodo}
              variant="contained"
              color="primary"
              style={{ marginTop: "12.5px" }}
            >
              {btnText}
            </Button>
          </Grid>

          <Grid item md={5}>
            {this.props.loading && (
              <p>
                <b>{this.props.loadingText}</b>
              </p>
            )}
            {renderTodos()}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withLoader(withFirebase(Todos));

// https://www.c-sharpcorner.com/article/react-crud-operation-with-firebase/
