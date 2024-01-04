import "./App.css";
import MainComponent from "./components/MainComponent";
import appStore from "./utils/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InterviewComponent from "./components/InterviewComponent";
import Report from "./components/Report";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const isReloaded = window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;

    if (isReloaded && window.location.pathname === '/interview') {
      window.location.href = '/';
    }
  }, []);

  return (
    <Provider store={appStore}>
      <Router>
        <div className="">
          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/interview" element={<InterviewComponent />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
