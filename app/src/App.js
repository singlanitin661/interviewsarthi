import "./App.css";
import MainComponent from "./MainComponent";
import appStore from "./utils/store";
import { Provider } from "react-redux";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import InterviewComponent from "./InterviewComponent";
const appRouter = createBrowserRouter([
    {
        path : "/",
        element: <MainComponent/>
    }, 
    {
        path:"/interview",
        element: <InterviewComponent/> 
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
