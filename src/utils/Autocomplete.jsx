/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ posts, handleAutocompleteChange }) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={posts}
      onChange={handleAutocompleteChange}
      size="small"
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}
