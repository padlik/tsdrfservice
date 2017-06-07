/**
 * Created by paul on 5/11/17.
 */

import {SUMMARY_REQ_FINISHED} from "redux/actions/summaryActions";
import {SUMMARY_REQ_SUBMITTED} from "redux/actions/summaryActions";

const summaryInitialState = {
    search_hash: '',
    summary: []
};

export default function (state = summaryInitialState, action) {
    switch (action.type) {
        case SUMMARY_REQ_FINISHED:
            return Object.assign({}, state, {summary:action.summary});
        case SUMMARY_REQ_SUBMITTED:
            return Object.assign({}, state, {search_hash: action.search_hash});
        default:
            return state;
    }

}