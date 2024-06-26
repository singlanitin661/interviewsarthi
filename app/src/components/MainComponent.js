import React from "react";
import LeftPanel from "./LeftPanel";
import RightPanelByAryan from "./RightPanelByAryan";
const MainComponent = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          paddingTop: "60px",
          height: "calc(100vh)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <LeftPanel />
          <RightPanelByAryan/>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
