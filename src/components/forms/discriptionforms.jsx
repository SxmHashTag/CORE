import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function DiscriptionForm({ label, name, valve, onChange, onBlur, errors, helperText,rows }) {
  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        sx={{ width: '100%' }}
        label={label}
        name = {name}
        value={valve}
        onChange={onChange}
        onBlur ={onBlur}
        multiline
        rows={rows}
        error={errors}
        helperText={helperText}
        variant="outlined"
      />
    </div>
  );
}
