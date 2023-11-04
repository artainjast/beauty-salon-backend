const {featuresStatus} = require('./appFeaturesStatus')

const isFeatureActive = (featureType) =>
  !!featuresStatus?.[featureType]?.[process.env.NODE_ENV];

module.exports = {
    isFeatureActive
}