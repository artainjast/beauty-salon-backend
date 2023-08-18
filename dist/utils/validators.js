const { isEmpty, isUndefined } = require('./index');
const PHONE_INPUT_LENGTH = 11;
const phoneNumberValidator = (phoneNumber) => {
    if (phoneNumber.length !== PHONE_INPUT_LENGTH) {
        return 'تعداد ارقام شماره نادرست است.';
    }
    const phoneLetterContainLetterValidationRegex = new RegExp(/^([0-9]|[۰-۹])*$/);
    const hasPhoneContainLetterValidationError = !phoneLetterContainLetterValidationRegex.test(phoneNumber);
    if (hasPhoneContainLetterValidationError) {
        return 'تعداد ارقام شماره نادرست است.';
    }
    const phoneStructureValidationRegex = new RegExp(/^(0|۰)(9|۹)([0-9]|[۰-۹]){9}$/g);
    const hasPhonestructureValidationError = !phoneStructureValidationRegex.test(phoneNumber);
    if (hasPhonestructureValidationError) {
        return 'پترن شماره مشکل دارد.';
    }
    return true;
};
const requestValidator = (...params) => {
    let isValidParam = true;
    params.map((item) => {
        if (isUndefined(item) || item.length === 0) {
            isValidParam = false;
            return;
        }
    });
    return isValidParam;
};
module.exports = {
    phoneNumberValidator,
    requestValidator
};
//# sourceMappingURL=validators.js.map