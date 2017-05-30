/**
 * Created by paul on 5/11/17.
 */
import {LIST_SEARCH_CHANGED, SUMMARY_SEARCH_CHANGED} from "redux/actions/searchActions";

const searchInitialState = {
    summary_search: {
        month: '',
        search: ''
    },
    list_search: {
        month: '',
        search: '',
        userid: ''
    }
};

export default function (state = searchInitialState, action) {
    switch (action.type) {
        case SUMMARY_SEARCH_CHANGED:
            return Object.assign({}, state, {
                summary_search: action.summary_search
            });
        case LIST_SEARCH_CHANGED:
            return Object.assign({}, state, {
                list_search: action.list_search
            });
        default:
            return state;
    }
}
