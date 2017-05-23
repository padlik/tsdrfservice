/**
 * Created by paul on 5/23/17.
 */
import {DETAIL_REQ_FINISHED} from "redux/actions/detailActions";

const detailInitialState = {
    details: []
};

export default function (state = detailInitialState, action) {
    switch (action.type) {
        case DETAIL_REQ_FINISHED:
            return {
                details: action.detail
            };
        default:
            return state;

    }

}