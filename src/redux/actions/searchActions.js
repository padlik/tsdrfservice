/**
 * Created by paul on 5/11/17.
 */
import {DETAIL_LIST_VIEW, isError, isLoading, SUMMARY_VIEW} from "redux/actions/uiActions";
import fetch from "isomorphic-fetch";
import {summaryRequestFinished} from "redux/actions/summaryActions";
export const SEARCH_CHANGED = 'SEARCH_CHANGED';

export function searchChanged(params) {
    let {search, date_from, date_to} = params;
    return {
        type: SEARCH_CHANGED,
        search: search,
        date_from: date_from,
        date_to: date_to
    }
}

const apiUrl = `//localhost:8000/api/`;
const reqParams = {
    prefix: `users/?format=json`,
    payload: () => {
    }
};

function makeReqParamsFromState(state) {
    let {view} = state.ui;
    switch (view) {
        case SUMMARY_VIEW:
            return Object.assign({}, reqParams, {
                payload: summaryRequestFinished,
                prefix: `users/?format=json`
            });
        default:
            return {
                prefix: `users/?format=json`,
                payload: () => {
                }
            }
    }

}

//Central point to issue Api Requests from any view. Just set appropriate view in ui call apiRequest
//it should automatically extract search conditions and URL parameters

export function apiRequest() {
    return (dispatch, getState) => {
        let state = getState();
        let params = makeReqParamsFromState(state);
        let {search, date_from, date_to} = state.search;
        let url = apiUrl + params.prefix;
        if (search) {
            url += `&search=${search}`
        }
        if (date_from) {
            url += `&date_from=${date_from}`
        }
        if (date_to) {
            url += `&date_to=${date_to}`
        }
        dispatch(isLoading(true));
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(params.payload(json)))
            .then(() => dispatch(isLoading(false)))
            .catch(({errors}) => dispatch(isError(errors)));
    }
}