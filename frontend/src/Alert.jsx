import React from 'react'
import Alert from '@mui/material/Alert';

function alert(props) {
  return (
    <Alert severity={props.severity}>This is a success Alert.</Alert>
  )
}

export default alert