/**
 * Created by paul on 5/17/17.
 */
import {fetchJson, replaceErrors} from "utils/fetchJson";

export const ACTIVE_VIEW_CHANGED = 'ACTIVE_VIEW_CHANGED'; //called when active view has changed from summary to detail
export const ON_LOADING = 'ON_LOADING';
export const ON_ERROR = 'ON_ERROR';
export const ON_MESSAGE = 'ON_MESSAGE';
export const ON_OVERALL_UPDATED = 'ON_OVERALL_UPDATED';


export const SUMMARY_VIEW = 'SUMMARY_VIEW';
export const DETAIL_LIST_VIEW = 'DETAIL_LIST_VIEW';


export const viewChanged = (view) => {
    return {
        type: ACTIVE_VIEW_CHANGED,
        view: view
    }
};

export const isLoading = (loading) => {
    return {
        type: ON_LOADING,
        loading: loading,
        message: ''
    }

};

export const isError = (error) => {
    console.dir(error);
    return {
        type: ON_ERROR,
        errors: error,
        message: ''
    }
};

export const onMessage = (msg) => {
    return {
        type: ON_MESSAGE,
        message: msg
    }
};

export const onOverallUpdated = (json) => {
    return {
        type: ON_OVERALL_UPDATED,
        json: json
    }
};


