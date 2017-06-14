/**
 * Created by paul on 5/18/17.
 */
import fetch from "isomorphic-fetch";


const checkStatus = (response) => {
    if (response.ok) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
};

const parseJSON = (response) => {
    return response.json();
};

export const fetchJson = (url, options) => {
    options.headers = Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }, options.headers);
    if (typeof options.body !== 'string') {
        options.body = JSON.stringify(options.body);
    }
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch((error) => {
            throw error
        });
};
