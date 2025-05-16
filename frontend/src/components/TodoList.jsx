import React from 'react';
import TodoItem from './TodoItem';
import { List, Typography } from '@mui/material';

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  if (todos.length === 0) {
    return (
      <Typography variant="body1" align="center" color="text.secondary">
        No tasks to show.
      </Typography>
    );
  }

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </List>
  );
};

export default TodoList;
