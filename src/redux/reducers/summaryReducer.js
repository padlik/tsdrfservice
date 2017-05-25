/**
 * Created by paul on 5/11/17.
 */

import {SUMMARY_REQ_FINISHED} from "redux/actions/summaryActions";

const summaryInitialState = {
    summary: []
};

export default function (state = summaryInitialState, action) {
    switch (action.type) {
        case SUMMARY_REQ_FINISHED:
            return {
                summary: action.summary
            };
        default:
            return state;
    }

}