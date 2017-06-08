/**
 * Created by paul on 5/11/17.
 */

export const SUMMARY_REQ_FINISHED = 'SUMMARY_REQ_FINISHED';
export const SUMMARY_REQ_SUBMITTED = 'SUMMARY_REQ_SUBMITTED';
export const SUMMARY_INVALIDATE = 'SUMMARY_INVALIDATE';

export function summaryRequestFinished(jsonResult) {
    return {
        type: SUMMARY_REQ_FINISHED,
        summary: jsonResult
    }
}


export function summaryRequestSubmitted(searchHash) {
    return {
        type: SUMMARY_REQ_SUBMITTED,
        search_hash: searchHash
    }
}

export function summaryInvalidate(isInvalid) {
    return {
        type: SUMMARY_INVALIDATE,
        invalid: isInvalid
    }
}