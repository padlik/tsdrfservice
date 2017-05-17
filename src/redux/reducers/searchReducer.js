/**
 * Created by paul on 5/11/17.
 */
import {SUMMARY_SEARCH_CHANGED} from "redux/actions/searchActions";

const searchInitialState = {
    summary_search: {
        date_from: '',
        date_to: '',
        search: ''
    },
    list_search: {
        date_from: '',
        date_to: '',
        search: ''
    }
};

export default function (state = searchInitialState, action) {
    switch (action.type) {
        case SUMMARY_SEARCH_CHANGED:
            return Object.assign({}, state, {
                summary_search: action.summary_search
            });
        default:
            return state;
    }
}
