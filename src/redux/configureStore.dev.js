/**
 * Created by paul on 6/14/17.
 */
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import {composeWithDevTools} from "redux-devtools-extension";


const initialState = {};
export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));;

const configureStore = () => {
    return store;
};

export default configureStore;
