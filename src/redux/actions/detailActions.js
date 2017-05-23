/**
 * Created by paul on 5/23/17.
 */

export const DETAIL_REQ_FINISHED = 'DETAIL_REQ_FINISHED';

export function detailRequestFinished(json) {
    return {
        type: DETAIL_REQ_FINISHED,
        detail: json
    }
}