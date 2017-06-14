/**
 * Created by paul on 5/11/17.
 */
import {combineReducers} from "redux";
import summaryReducer from "./summaryReducer";
import searchReducer from "./searchReducer";
import uiReducer from "./uiReducer";
import detailReducer from "./detailReducer";


const rootReducer = combineReducers({
    summary: summaryReducer,
    search: searchReducer,
    ui: uiReducer,
    detail: detailReducer
});

export default rootReducer;
