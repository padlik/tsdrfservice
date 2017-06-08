/**
 * Created by paul on 5/11/17.
 */

import {SUMMARY_INVALIDATE, SUMMARY_REQ_FINISHED, SUMMARY_REQ_SUBMITTED} from "redux/actions/summaryActions";

const summaryInitialState = {
    search_hash: '',
    summary: [],
    invalid: false
};

export default function (state = summaryInitialState, action) {
    switch (action.type) {
        case SUMMARY_REQ_FINISHED:
            return Object.assign({}, state, {summary: action.summary});
        case SUMMARY_REQ_SUBMITTED:
            return Object.assign({}, state, {search_hash: action.search_hash});
        case SUMMARY_INVALIDATE:
            return Object.assign({}, state, {invalid: action.invalid});
        default:
            return state;
    }

}