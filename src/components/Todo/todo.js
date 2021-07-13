import React from "react";

const Todo = ({ id, todo, handleDelete }) => {
  return (
    <div>
      <li>{todo}</li>
      <button
        onClick={() => {
          handleDelete(id);
        }}
      >
        Delete todo
      </button>
    </div>
  );
};

export default Todo;
