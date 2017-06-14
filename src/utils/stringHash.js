/**
 * Created by paul on 6/7/17.
 */

const realHash = (s) => {
    let hash = 0, i, chr;
    if (!s.length) return hash;
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const stringHash = (...args) => {
    let str = '';
    for (let arg of args) str += arg.toString();
    return realHash(str);
};

export default stringHash;