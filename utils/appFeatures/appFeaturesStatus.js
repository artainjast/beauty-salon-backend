const { appFeatures } = require("../../constants/appFeatures")

const featuresStatus = {
    [appFeatures.SENDING_REMEMBER_SMS]: {
        demo: true,
        production : false
    }
}

module.exports = {
    featuresStatus
}