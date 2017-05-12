/**
 * Created by paul on 5/11/17.
 */

import {
    SUMMARY_INVALIDATED,
    SUMMARY_REQ_ERROR,
    SUMMARY_REQ_FINISHED,
    SUMMARY_REQ_STARTED
} from "redux/actions/summaryActions";

const summaryInitialState = {
    summary: [],
    errors: null,
    loading: false,
    invalidate: false
};

export default function (state = summaryInitialState, action) {
    switch (action.type) {
        case SUMMARY_REQ_STARTED:
            return Object.assign({}, state, {loading: true, errors: null, invalidate: false});
        case SUMMARY_REQ_FINISHED:
            return {
                loading: false,
                errors: null,
                invalidate: false,
                summary: action.summary
            };
        case SUMMARY_REQ_ERROR:
            return Object.assign({}, state, {loading: false, errors: action.errors, invalidate: false});
        case SUMMARY_INVALIDATED:
            return Object.assign({}, state, {invalidate: true});
        default:
            return state;
    }

}