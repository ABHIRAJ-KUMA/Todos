import React from 'react';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';

const Filter = ({ filter, setFilter }) => {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  return (
    <Box sx={{ mb: 2, textAlign: 'center' }}>
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label="filter todos"
        size="small"
      >
        <ToggleButton value="all" aria-label="all tasks">
          All
        </ToggleButton>
        <ToggleButton value="completed" aria-label="completed tasks">
          Completed
        </ToggleButton>
        <ToggleButton value="pending" aria-label="pending tasks">
          Pending
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default Filter;
