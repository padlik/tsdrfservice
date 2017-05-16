/**
 * Created by paul on 5/11/17.
 */
export const SEARCH_CHANGED = 'SEARCH_CHANGED';

export function searchChanged(params) {
    let {search, date_from, date_to} = params;
    return {
        type: SEARCH_CHANGED,
        search: search,
        date_from: date_from,
        date_to: date_to
    }
}
