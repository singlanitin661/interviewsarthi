import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position='fixed' style={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" style={{fontFamily:'comic-sans-MS'}}>InterviewSarthi</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
