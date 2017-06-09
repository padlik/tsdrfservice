/**
 * Created by paul on 5/17/17.
 */
import {
    ACTIVE_VIEW_CHANGED,
    DETAIL_LIST_VIEW,
    ON_ERROR,
    ON_LOADING,
    ON_MESSAGE,
    ON_OVERALL_UPDATED,
    SUMMARY_VIEW
} from "redux/actions/uiActions";

const uiInitialState = {
    view: SUMMARY_VIEW,
    loading: false,
    errors: {},
    message: '',
    overall: {timesheets: -1}
};

export default function (state = uiInitialState, action) {
    switch (action.type) {
        case ACTIVE_VIEW_CHANGED:
            return Object.assign({}, state, {
                view: action.view,
                loading: false,
                errors: {}
            });
        case ON_LOADING:
            return Object.assign({}, state, {
                message: '',
                loading: action.loading,
                errors: {}
            });
        case ON_ERROR:
            return Object.assign({}, state, {
                loading: false,
                message: '',
                errors: action.errors
            });
        case ON_MESSAGE:
            return Object.assign({}, state, {
                message: action.message,
                errors: {}
            });
        case ON_OVERALL_UPDATED:
            return Object.assign({}, state, {
                overall: action.json
            });
        default:
            return state;
    }
}
