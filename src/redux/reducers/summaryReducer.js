/**
 * Created by paul on 5/11/17.
 */

import {SUMMARY_INVALIDATED, SUMMARY_REQ_FINISHED} from "redux/actions/summaryActions";

const summaryInitialState = {
    summary: [],
    invalidate: false
};

export default function (state = summaryInitialState, action) {
    switch (action.type) {
        case SUMMARY_REQ_FINISHED:
            return {
                invalidate: false,
                summary: action.summary
            };
        case SUMMARY_INVALIDATED:
            return Object.assign({}, state, {invalidate: true});
        default:
            return state;
    }

}