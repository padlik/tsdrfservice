/**
 * Created by paul on 5/11/17.
 */
import {combineReducers} from "redux";
import summaryReducer from "./summaryReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    summary: summaryReducer,
    search: searchReducer
});
