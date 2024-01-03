import "./App.css";
import MainComponent from "./MainComponent";
import appStore from "./utils/store";
import { Provider } from "react-redux";
import 'tailwindcss/tailwind.css';
function App() {
  return (
    <Provider store={appStore}>
      <div className="">
        <MainComponent />
      </div>
    </Provider>
  );
}

export default App;
