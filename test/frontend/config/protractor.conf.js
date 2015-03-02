var Config = require('../acceptance/config.js');


exports.config = {

  allScriptsTimeout: 11000,

  specs: [
        '../acceptance/desktop/landing.e2e.js',
        '../acceptance/desktop/services/categories.e2e.js',
        '../acceptance/desktop/services/services.e2e.js',
    // Mobil
        '../acceptance/mobile/landing.e2e.js',
        '../acceptance/mobile/services/categories.e2e.js',
        '../acceptance/mobile/services/services.e2e.js',
  ],

  sauceUser: process.env.SAUCE_USERNAME ,

  sauceKey: process.env.SAUCE_ACCESS_KEY, 

  capabilities: {
    'browserName': 'chrome',
    'platform': 'ANY',
    'tunnel-identifier': (process.env.TRAVIS) ? process.env.TRAVIS_JOB_NUMBER : process.env.TUNNEL_ID,
    'build': process.env.TRAVIS_BUILD_NUMBER,
    'name': 'App Tests'
  },

  baseUrl: Config.path.main,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
  
};

