import {API_URL, OVERALL_EP, REFRESH_INTERVAL, REQ_FORMAT} from "utils/const";
import {fetchJson} from "utils/fetchJson";
import configureStore from "redux/configureStore";
import {isError, onMessage, onOverallUpdated} from "redux/actions/uiActions";
import {summaryInvalidate} from "redux/actions/summaryActions";
import {detailInvalidated} from "redux/actions/detailActions";


const scheduler = () => {
    console.log("Starting scheduler");
    window.setInterval(
        () => {
            let store = configureStore();
            let url = API_URL + OVERALL_EP + REQ_FORMAT;
            fetchJson(url, {})
                .then(json => {
                    let curTsCount = store.getState().ui.overall.timesheets;
                    store.dispatch(onOverallUpdated(json));
                    if (curTsCount !== json.timesheets && curTsCount !== -1) {
                        store.dispatch(summaryInvalidate(true)); //set invalidate flag
                        store.dispatch(detailInvalidated());
                        console.log('Invalidate logic should go there...');
                    }
                })
                .catch(error => store.dispatch(isError(error)))
        },
        REFRESH_INTERVAL);
};

export default scheduler;