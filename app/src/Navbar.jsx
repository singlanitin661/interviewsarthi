import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant="h6">InterviewSarthi</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
