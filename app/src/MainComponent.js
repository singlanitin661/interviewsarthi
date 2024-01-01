import React from 'react';
import Navbar from './Navbar';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { Container } from '@mui/material';

const MainComponent = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
};

export default MainComponent;
