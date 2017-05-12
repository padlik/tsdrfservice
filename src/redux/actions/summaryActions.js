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

export function summaryRequest(text) {
    return (dispatch, getState) => {
        let state = getState();
        let url = `//localhost:8000/api/users/?format=json`;
        if (text) {
            url += `&search=${text}`
        }
        dispatch(summaryRequestStarted());
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(summaryRequestFinished(json)))
            .catch(({errors}) => dispatch(summaryRequestError(errors)));
    }
}