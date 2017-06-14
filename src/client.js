/**
 * Created by paul on 5/4/17.
 */
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configureStore from "./redux/configureStore";
import App from "components/App/App";
import {apiRequestSummary} from "redux/actions/searchActions";


const store = configureStore();
store.dispatch(apiRequestSummary()); //initial load

const component = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));