import axios from "axios";
import "./App.css";
import { Provider } from "react-redux";
import Router from "./components/Router";
import store from "./redux/store";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
