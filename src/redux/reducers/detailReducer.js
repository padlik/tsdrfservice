/**
 * Created by paul on 5/23/17.
 */
import {DETAIL_REQ_FINISHED} from "redux/actions/detailActions";

const detailInitialState = {
    details: []
};


const detailReducer = (state = detailInitialState, action) => {
    switch (action.type) {
        case DETAIL_REQ_FINISHED:
            let idx = state.details.findIndex(row => row.userid === action.userid);
            if (idx === -1) {
                return {
                    details: [
                        ...state.details.slice(),
                        {
                            userid: action.userid,
                            search_hash: action.search_hash,
                            sheets: action.sheets,
                            invalid: false
                        },
                    ]
                }

            }

            return {
                details: [
                    ...state.details.slice(0, idx),
                    {
                        userid: action.userid,
                        search_hash: action.search_hash,
                        sheets: action.sheets,
                        invalid: false
                    },
                    ...state.details.slice(idx + 1),
                ]
            };

        default:
            return state;

    }

};

export default detailReducer;