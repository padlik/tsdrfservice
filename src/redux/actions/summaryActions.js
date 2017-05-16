/**
 * Created by paul on 5/11/17.
 */
import fetch from "isomorphic-fetch";

export const SUMMARY_REQ_STARTED = 'SUMMARY_REQ_STARTED';
export const SUMMARY_REQ_FINISHED = 'SUMMARY_REQ_FINISHED';
export const SUMMARY_REQ_ERROR = 'SUMMARY_REQ_ERROR';
export const SUMMARY_INVALIDATED = 'SUMMARY_INVALIDATED'; //Will called to catch updates or manual refresh

export function invalidateSummary() {
    return {
        type: SUMMARY_INVALIDATED
    }
}

export function summaryRequestStarted() {
    return {
        type: SUMMARY_REQ_STARTED
    }
}

export function summaryRequestFinished(jsonResult) {
    return {
        type: SUMMARY_REQ_FINISHED,
        summary: jsonResult
    }
}

export function summaryRequestError(errors) {
    return {
        type: SUMMARY_REQ_ERROR,
        errors: errors
    }

}

export function summaryRequest() {
    return (dispatch, getState) => {
        let state = getState();
        let {search, date_from, date_to} = state.search;
        let url = `//localhost:8000/api/users/?format=json`;
        if (search) {
            url += `&search=${search}`
        }
        if (date_from) {
            url += `&date_from=${date_from}`
        }
        if (date_to) {
            url += `&date_to=${date_to}`
        }
        dispatch(summaryRequestStarted());
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(summaryRequestFinished(json)))
            .catch(({errors}) => dispatch(summaryRequestError(errors)));
    }
}