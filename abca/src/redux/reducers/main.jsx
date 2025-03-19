import {combineReducers} from "redux";
import  {cartreducer}  from "./reducer";
import authReducer from "./authReducer";
const rootred = combineReducers({
    auth: authReducer,
    cartreducer
    
});
export default rootred              