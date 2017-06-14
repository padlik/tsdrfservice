/**
 * Created by paul on 5/11/17.
 */
import {LIST_SEARCH_CHANGED, SUMMARY_SEARCH_CHANGED} from "redux/actions/searchActions";
import {defaultMonth} from "utils/dateUtils";


const searchInitialState = {
    summary_search: {
        month: defaultMonth(),
        search: ''
    },
    list_search: {
        searches: []
    }
};

const searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case SUMMARY_SEARCH_CHANGED:
            return Object.assign({}, state, {
                summary_search: action.summary_search
            });
        case LIST_SEARCH_CHANGED:
            let idx = state.list_search.searches.findIndex(row => row.userid === action.list_search.userid);
            if (idx === -1) {
                return Object.assign({}, state, {
                    list_search: {
                        searches: [
                            ...state.list_search.searches.slice(),
                            {
                                month: action.list_search.month,
                                search: action.list_search.search,
                                userid: action.list_search.userid,
                                inherit: action.list_search.inherit
                            },
                        ]
                    }
                });
            }
            return Object.assign({}, state, {
                list_search: {
                    searches: [
                        ...state.list_search.searches.slice(0, idx),
                        {
                            month: action.list_search.month,
                            search: action.list_search.search,
                            userid: action.list_search.userid,
                            inherit: action.list_search.inherit
                        },
                        ...state.list_search.searches.slice(idx + 1)
                    ]
                }
            });

        default:
            return state;
    }
};

export default searchReducer;
