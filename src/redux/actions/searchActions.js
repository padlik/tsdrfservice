/**
 * Created by paul on 5/11/17.
 */
export const SEARCH_CHANGED = 'SEARCH_CHANGED';

export function searchChanged(search_params) {
    let {search, date_from, date_to} = search_params;
    return {
        type: SEARCH_CHANGED,
        search: search,
        date_from: '',
        date_to: ''
    }
}
