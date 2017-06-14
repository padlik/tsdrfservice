/**
 * Created by paul on 5/11/17.
 */
import {DETAIL_LIST_VIEW, isError, isLoading, onMessage, SUMMARY_VIEW} from "redux/actions/uiActions";
import {fetchJson, replaceErrors} from "utils/fetchJson";
import {summaryInvalidate, summaryRequestFinished, summaryRequestSubmitted} from "redux/actions/summaryActions";
import {detailRequestFinished} from "redux/actions/detailActions";
import {borderOfMonth, defaultMonth, toSqlDate, weekOfMonth} from "utils/dateUtils";
import stringHash from "utils/stringHash";
import {API_URL, REQ_FORMAT, USER_EP} from "utils/const";
export const SUMMARY_SEARCH_CHANGED = 'SUMMARY_SEARCH_CHANGED';
export const LIST_SEARCH_CHANGED = 'LIST_SEARCH_CHANGED';


export const summarySearchChanged = (state) => {
    let {search, month} = state;
    month = (month) ? month : defaultMonth();
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: search,
            month: month
        }
    }
};

export const summarySearchClear = () => {
    const defMonth = defaultMonth();
    return {
        type: SUMMARY_SEARCH_CHANGED,
        summary_search: {
            search: '',
            month: defMonth,
        }
    }
};

export const listSearchChanged = (params) => {
    const {search, month, userid, inherit} = params;
    return {
        type: LIST_SEARCH_CHANGED,
        list_search: {
            search: search,
            month: month,
            userid: userid,
            inherit: inherit
        }
    }
};


export const apiRequestSummary = () => {
    return (dispatch, getState) => {
        const state = getState();
        const {search, month} = state.search.summary_search;
        let url = API_URL + USER_EP + REQ_FORMAT;
        const {first, last} = borderOfMonth(month);
        if (search) {
            url += `&search=${search}`
        }
        if (first) {
            url += `&date_from=${toSqlDate(first)}`
        }
        if (last) {
            url += `&date_to=${toSqlDate(last)}`
        }
        const searchHash = stringHash(search, first, last);
        if (searchHash !== state.summary.search_hash || state.summary.invalid) {
            dispatch(isLoading(true));
            dispatch(onMessage(''));
            return fetchJson(url, {})
                .then(json => dispatch(summaryRequestFinished(json)))
                .then(() => dispatch(isLoading(false)))
                .then(() => dispatch(summaryRequestSubmitted(searchHash)))
                .then(() => dispatch(summaryInvalidate(false)))
                .catch((error) => dispatch(isError(error)));
        } else {
            return dispatch(onMessage("cached"));
        }
    }
};

export const apiRequestDetail = (userId) => {
    return (dispatch, getState) => {
        const state = getState();
        const {userid, search, month} = state.search.list_search.searches.filter(row => {
            return (row.userid === userId)
        })[0];
        let url = API_URL + USER_EP + `/${userid}` + REQ_FORMAT;
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
        const searchHash = stringHash(search, first, last);

        const detail = state.detail.details.filter(row => {
            return (row.userid === userId)
        });

        const currentHash = (detail.length) ? detail[0].search_hash : '';
        const invalid = (detail.length) ? detail[0].invalid : false;

        if (searchHash !== currentHash || invalid) {
            dispatch(isLoading(true));
            dispatch(onMessage(''));
            return fetchJson(url, {})
                .then(json => dispatch(detailRequestFinished(userid, json, searchHash)))
                .then(() => dispatch(isLoading(false)))
                .catch((error) => dispatch(isError(error)));
        } else {
            dispatch(onMessage("cached"));
        }
    }
};

