import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function Textform({ label, name, value, onChange, onBlur, errors, helperText }) {
  return (
    <TextField 
      id="standard-basic" 
      sx={{ width: '100%' }}
      label={label} 
      name={name}
      value={value} // Fixed the prop name
      onChange={onChange}
      onBlur={onBlur}
      error={errors}
      helperText={helperText}
      variant="outlined" 
    />
  );
}