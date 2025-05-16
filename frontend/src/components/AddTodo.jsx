
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <TextField
        fullWidth
        label="Add new task"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        size="small"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
