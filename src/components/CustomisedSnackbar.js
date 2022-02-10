import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CustomisedSnackbar = ({ show, msg, color }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = React.useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return <div>
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={show}
      onClose={handleClose}
      message="I love snacks"
      key={vertical + horizontal}
    >
      <Alert severity={color} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>

  </div>;
};

export default CustomisedSnackbar;
