const isNumber = (value) => {
    if (typeof value === 'number')
        return true;
    else if (typeof value === 'string')
        return !isNaN(Number(value));
    return false;
};
const isString = (value) => {
    return typeof value === 'string';
};
// testcomment
const toEn = (persianNumber) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let englishNumber = "";
    for (let i = 0; i < persianNumber.length; i++) {
        const char = persianNumber.charAt(i);
        const index = persianDigits.indexOf(char);
        if (index !== -1) {
            englishNumber += index;
        }
        else {
            englishNumber += char;
        }
    }
    return englishNumber;
};
const isArray = (value) => {
    return Array.isArray(value);
};
const isObject = (val) => {
    return (val !== null &&
        typeof val === 'object' &&
        Array.isArray(val) === false &&
        Object.prototype.toString.call(val) === '[object Object]');
};
const isEmpty = (data) => {
    return (!data && !isNumber(data)) ||
        (Array.isArray(data) && data.length === 0) ||
        (isObject(data) && Object.keys(data).length === 0);
};
const isUndefined = (data) => {
    return typeof data === 'undefined';
};
module.exports = {
    toEn,
    isEmpty,
    isUndefined,
};
//# sourceMappingURL=index.js.map