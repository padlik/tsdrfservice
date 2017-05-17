/**
 * Created by paul on 5/11/17.
 */

export const SUMMARY_REQ_FINISHED = 'SUMMARY_REQ_FINISHED';
export const SUMMARY_INVALIDATED = 'SUMMARY_INVALIDATED'; //Will called to catch updates or manual refresh

export function invalidateSummary() {
    return {
        type: SUMMARY_INVALIDATED
    }
}

export function summaryRequestFinished(jsonResult) {
    return {
        type: SUMMARY_REQ_FINISHED,
        summary: jsonResult
    }
}

