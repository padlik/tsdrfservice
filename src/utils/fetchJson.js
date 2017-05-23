/**
 * Created by paul on 5/18/17.
 */
import fetch from "isomorphic-fetch";


function checkStatus(response) {
    console.dir(response);
    if (response.ok) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

export function fetchJson(url, options) {
    options.headers = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, options.headers);
    if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}