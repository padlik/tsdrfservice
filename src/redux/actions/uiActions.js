/**
 * Created by paul on 5/17/17.
 */
export const ACTIVE_VIEW_CHANGED = 'ACTIVE_VIEW_CHANGED'; //called when active view has changed from summary to detail
export const ON_LOADING = 'ON_LOADING';
export const ON_ERROR = 'ON_ERROR';


export const SUMMARY_VIEW = 'SUMMARY_VIEW';
export const DETAIL_LIST_VIEW = 'DETAIL_LIST_VIEW';


export function viewChanged(view) {
    return {
        type: ACTIVE_VIEW_CHANGED,
        view: view
    }
}

export function isLoading(loading) {
    return {
        type: ON_LOADING,
        loading: loading
    }

}

export function isError(errors) {
    return {
        type: ON_ERROR,
        errors: errors
    }
}
