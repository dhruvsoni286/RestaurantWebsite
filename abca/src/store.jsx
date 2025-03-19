import { createStore } from "redux";
import rootred from "./redux/reducers/main";
import { Provider } from "react-redux";


const store = createStore(
    rootred
);


export default store;