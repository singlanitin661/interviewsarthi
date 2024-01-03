import React from 'react';
import Navbar from './Navbar';
import LeftPanel from './LeftPanel';
import RightPanelByAryan from './RightPanelByAryan';

const MainComponent = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar />
      <div style={{ paddingTop: '64px', height: 'calc(100vh)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <LeftPanel />
          <RightPanelByAryan/>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;