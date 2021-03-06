var path = require('path'),
    fs = require('fs'),
    android_build = require('./makers/android'),
    create_mobspec= require('./create_mobile_spec_app'),
    ios_build     = require('./makers/ios'),
    blackberry_build=require('./makers/blackberry');

// results location
var posts = path.join(__dirname, '..', 'posts');
// mobile spec output location
var mobile_spec_app = path.join(__dirname, '..', 'temp', 'mobspec');
// where we store generated apps mapping
var output_paths = {
    'incubator-cordova-android':path.join(__dirname, '..', 'temp', 'android'),
    'incubator-cordova-ios':path.join(__dirname, '..', 'temp', 'ios'),
    'incubator-cordova-blackberry-webworks':path.join(__dirname, '..', 'temp', 'blackberry')
};

// builder mapping
var builders = {
    'incubator-cordova-android':android_build,
    'incubator-cordova-ios':ios_build,
    'incubator-cordova-blackberry-webworks':blackberry_build
};

module.exports = function builder(commits) {
    if (!fs.existsSync(mobile_spec_app)) create_mobspec();

    // commits format:
    // { incubator-cordova-android:'sha',
    //   incubator-cordova-ios:'sha' }
    for (var lib in commits) if (commits.hasOwnProperty(lib)) {
        if (builders.hasOwnProperty(lib)) {
            builders[lib](output_paths[lib], commits[lib]);
        }
    }
};
