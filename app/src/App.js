import "./App.css";
import MainComponent from "./MainComponent";
import appStore from "./utils/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={appStore}>
      <div className="">
        <MainComponent />
        {/* HR */}
      </div>
    </Provider>
  );
}

export default App;
