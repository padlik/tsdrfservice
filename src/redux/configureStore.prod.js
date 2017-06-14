/**
 * Created by paul on 6/14/17.
 */
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";


const initialState = {};
export const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

const configureStore = () => {
    return store;
};

export default configureStore;
