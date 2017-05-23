/**
 * Created by paul on 5/17/17.
 */
import {ACTIVE_VIEW_CHANGED, DETAIL_LIST_VIEW, ON_ERROR, ON_LOADING, SUMMARY_VIEW} from "redux/actions/uiActions";

const uiInitialState = {
    view: SUMMARY_VIEW,
    loading: false,
    errors: []
};

export default function (state = uiInitialState, action) {
    switch (action.type) {
        case ACTIVE_VIEW_CHANGED:
            return Object.assign({}, state, {
                view: action.view,
                loading: false,
                errors: []
            });
        case ON_LOADING:
            return Object.assign({}, state, {
                loading: action.loading
            });
        case ON_ERROR:
            return Object.assign({}, state, {
                loading: false,
                errors: action.errors
            });
        default:
            return state;
    }
}
