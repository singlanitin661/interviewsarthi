import React from 'react';
import Navbar from './Navbar';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const MainComponent = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Navbar totalCount={4} />
      <div style={{ paddingTop: '64px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <LeftPanel />
          <RightPanel totalCount={4}/>
          {/* <RightPanelByAryan/> */}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;