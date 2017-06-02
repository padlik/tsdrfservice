/**
 * Created by paul on 5/11/17.
 */
import {DETAIL_LIST_VIEW, isError, isLoading, SUMMARY_VIEW} from "redux/actions/uiActions";
import {fetchJson, replaceErrors} from "utils/fetchJson";
import {summaryRequestFinished} from "redux/actions/summaryActions";
import {detailRequestFinished} from "redux/actions/detailActions";
import {borderOfMonth, defaultMonth, toSqlDate, weekOfMonth} from "utils/dateUtils";
export const SUMMARY_SEARCH_CHANGED = 'SUMMARY_SEARCH_CHANGED';
export const LIST_SEARCH_CHANGED = 'LIST_SEARCH_CHANGED';


export function summarySearchChanged(state) {
    let {search, month} = state;
    month = (month) ? month : defaultMonth();
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: search,
            month: month
        }
    }
}

export function summarySearchClear() {
    let defMonth = defaultMonth();
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: '',
            month: defMonth,
        }
    }
}

export function listSearchChanged(params) {
    let {search, month, userid, inherit} = params;
    console.log("In changed");
    console.dir(params);
    return {
        type: LIST_SEARCH_CHANGED,
        list_search: {
            search: search,
            month: month,
            userid: userid,
            inherit: inherit
        }
    }
}

const apiUrl = `//localhost:8000/api/`;


export function apiRequestSummary() {
    return (dispatch, getState) => {
        let state = getState();
        let {search, month} = state.search.summary_search;
        let url = apiUrl + `users/?format=json`;
        let {first, last} = borderOfMonth(month);
        if (search) {
            url += `&search=${search}`
        }
        if (first) {
            url += `&date_from=${toSqlDate(first)}`
        }
        if (last) {
            url += `&date_to=${toSqlDate(last)}`
        }
        dispatch(isLoading(true));
        return fetchJson(url, {})
            .then(json => dispatch(summaryRequestFinished(json)))
            .then(() => dispatch(isLoading(false)))
            .catch((error) => dispatch(isError(error)));
    }
}

export function apiRequestDetail(userId) {
    return (dispatch, getState) => {
        let state = getState();
        let {userid, search, month} = state.search.list_search.searches.filter(row => {
            return (row.userid === userId)
        })[0];
        let url = apiUrl + `users/${userid}/?format=json`;
        let {first, last} = borderOfMonth(month);
        if (search) {
            url += `&search=${search}`
        }
        if (first) {
            url += `&date_from=${toSqlDate(first)}`
        }
        if (last) {
            url += `&date_to=${toSqlDate(last)}`
        }
        dispatch(isLoading(true));
        return fetchJson(url, {})
            .then(json => dispatch(detailRequestFinished(userid, json)))
            .then(() => dispatch(isLoading(false)))
            .catch((error) => dispatch(isError(error)));
    }
}