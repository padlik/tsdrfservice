/**
 * Created by paul on 5/11/17.
 */
import {DETAIL_LIST_VIEW, isError, isLoading, SUMMARY_VIEW} from "redux/actions/uiActions";
import {fetchJson, replaceErrors} from "utils/fetchJson";
import {summaryRequestFinished} from "redux/actions/summaryActions";
import {detailRequestFinished} from "redux/actions/detailActions";
export const SUMMARY_SEARCH_CHANGED = 'SUMMARY_SEARCH_CHANGED';
export const LIST_SEARCH_CHANGED = 'LIST_SEARCH_CHANGED';

export function summarySearchChanged(state) {
    let {search, date_from, date_to} = state;
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: search,
            date_from: date_from,
            date_to: date_to
        }
    }
}

export function summarySearchClear() {
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: '',
            date_from: '',
            date_to: ''
        }
    }
}

export function listSearchChanged(params) {
    let {search, date_from, date_to, userid} = params;
    return {
        type: LIST_SEARCH_CHANGED,
        list_search: {
            search: search,
            date_from: date_from,
            date_to: date_to,
            userid: userid
        }
    }
}

const apiUrl = `//localhost:8000/api/`;

function makeReqParamsFromState(state) {
    let search_state = (state.ui.view === SUMMARY_VIEW) ? state.search.summary_search : state.search.list_search;
    let payload = (state.ui.view === SUMMARY_VIEW) ? summaryRequestFinished : detailRequestFinished;
    let {search, date_from, date_to, userid} = search_state;
    let prefix = (state.ui.view === SUMMARY_VIEW) ? `users/?format=json` : `users/${userid}/?format=json`;
    return {search, date_from, date_to, payload, prefix};
}

//Central point to issue Api Requests from any view. Just set appropriate view in ui call apiRequest
//it should automatically extract search conditions and URL parameters

export function apiRequest() {
    return (dispatch, getState) => {
        let state = getState();
        console.dir(state);
        let {search, date_from, date_to, payload, prefix} = makeReqParamsFromState(state);
        let url = apiUrl + prefix;
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
        return fetchJson(url, {})
            .then(json => dispatch(payload(json)))
            .then(() => dispatch(isLoading(false)))
            .catch((error) => dispatch(isError(error)));
    }
}