/**
 * Created by paul on 5/4/17.
 */
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import {createLogger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";

const loggerMiddleware = createLogger({level: 'info'});


export default function (initialState = {}) {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)));
}