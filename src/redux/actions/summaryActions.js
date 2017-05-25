/**
 * Created by paul on 5/11/17.
 */

export const SUMMARY_REQ_FINISHED = 'SUMMARY_REQ_FINISHED';


export function summaryRequestFinished(jsonResult) {
    return {
        type: SUMMARY_REQ_FINISHED,
        summary: jsonResult
    }
}

