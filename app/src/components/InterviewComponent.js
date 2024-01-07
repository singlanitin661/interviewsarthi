import React from 'react';
import Navbar from './Navbar';
import LeftPanel from './LeftPanel';
import RightPanelForChats from './RightPanelForChats';

const InterviewComponent = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ paddingTop: '60px', height: '100vh', overflow: 'hidden', display:"flex", flexDirection:"row" }}>
          <LeftPanel />
          <RightPanelForChats/>
      </div>
    </div>
  );
};

export default InterviewComponent;