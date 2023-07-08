import React from 'react';
import { TextField, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchInput = ({ onSearch }) => {
  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  return (
    <div>
      <TextField
        label='Proveedor'
        placeholder="Buscar..."
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
};

export default SearchInput;
