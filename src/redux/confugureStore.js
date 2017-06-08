/**
 * Created by paul on 5/4/17.
 */
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";


const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default function () {
    return store;
}