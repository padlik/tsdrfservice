/**
 * Created by paul on 5/30/17.
 */

export const weekOfMonth = (dateValue) => {
    let month = dateValue.getMonth()
        , year = dateValue.getFullYear()
        , firstWeekday = new Date(year, month, 1).getDay()
        , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
        , offsetDate = dateValue.getDate() + firstWeekday - 1
        , index = 1 // start index at 0 or 1, your choice
        , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
        , week = index + Math.floor(offsetDate / 7)
    ;
    if (week < 2 + index) return week;
    return week === weeksInMonth ? index + 5 : week;
};

export const defaultMonth = () => {
    let d = new Date(),
        w = weekOfMonth(d),
        m = (w < 4) ? d.getMonth() : d.getMonth() + 1,
        y = d.getFullYear();
    return `${y}-${('0' + m).slice(-2)}`;

};

export const borderOfMonth = (month) => {
    let d = new Date(month),
        m = d.getMonth(),
        y = d.getFullYear(),
        fd = new Date(y, m, 1),
        ld = new Date(y, m + 1, 0);
    return {first: fd, last: ld};
};

export const toSqlDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

