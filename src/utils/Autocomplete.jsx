/* eslint-disable no-use-before-define */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function ComboBox({
  posts,
  handleAutocompleteChange,
  autoCompleteValue,
}) {
  return (
    <Autocomplete
      id="selected-post"
      options={posts}
      onChange={handleAutocompleteChange}
      size="small"
      // value={autoCompleteValue}
      getOptionLabel={(option) => (option ? String(option.title) : '')}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select your Post Title"
          variant="outlined"
        />
      )}
    />
  )
}
