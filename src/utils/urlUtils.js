/**
 * Created by paul on 6/14/17.
 */

export const formatUrl = (state) => {
    let {search, month, inherit} = state;
    let u = '';
    if (search || month) {
        u += '?';
        if (search) {
            u += `search=${search}&`
        }
        if (month) {
            u += `month=${month}&`
        }
        if (inherit) {
            u += `inherit=${inherit}`
        }
    }
    return u;
};