import "./App.css";
import MainComponent from "./components/MainComponent";
import appStore from "./utils/store";
import { Provider } from "react-redux";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import InterviewComponent from "./components/InterviewComponent";
import Report from "./components/Report";
const appRouter = createBrowserRouter([
    {
        path : "/",
        element: <MainComponent/>
    }, 
    {
        path:"/interview",
        element: <InterviewComponent/> 
    },
    {
      path:"/report",
      element: <Report/> 
  }
]) 
function App() {
  return (
    <Provider store={appStore}>
      <div className="">
        <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  );
}

export default App;
