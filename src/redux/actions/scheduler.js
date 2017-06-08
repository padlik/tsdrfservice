import {API_URL, OVERALL_EP, REFRESH_INTERVAL, REQ_FORMAT} from "utils/const";

const schedulerUrl = `//localhost:8000/api/overall`;

export default function () {
    console.log("Starting scheduler");
    window.setInterval(() => {

    }, REFRESH_INTERVAL);
}