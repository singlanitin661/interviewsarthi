import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AIface from "./Aiface";
import Chatbot from "./Chatbot";
function App() {
  return (
    <div className="root">
      <Navbar className="root-Nabvar"/>
      <AIface className="root-left"/>
      {/* <Chatbot className="root-right"/> */}
    </div>
  );
}

export default App;
