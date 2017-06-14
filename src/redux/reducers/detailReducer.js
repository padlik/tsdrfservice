/**
 * Created by paul on 5/23/17.
 */
import {DETAIL_INVALIDATED, DETAIL_REQ_FINISHED} from "redux/actions/detailActions";

const detailInitialState = {
    details: []
};


const detailReducer = (state = detailInitialState, action) => {
    switch (action.type) {
        case DETAIL_REQ_FINISHED:
            const idx = state.details.findIndex(row => row.userid === action.userid);
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
        case DETAIL_INVALIDATED:
            if (state.details) {
                return {
                    details: state.details.map((detail) => {
                        return Object.assign({}, detail, {invalid: true});
                    })
                }
            } else {
                return state;
            }

        default:
            return state;

    }

};

export default detailReducer;