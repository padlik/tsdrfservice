/**
 * Created by paul on 5/11/17.
 */
import {SEARCH_CHANGED} from "redux/actions/searchActions";

const searchInitialState = {
    search: '',
    date_from: '',
    date_to: ''
};

export default function (state = searchInitialState, action) {
    switch (action.type) {
        case SEARCH_CHANGED:
            return Object.assign({}, state, {
                search: action.search,
                date_from: action.date_from,
                date_to: action.date_to
            });
        default:
            return state;
    }
}
