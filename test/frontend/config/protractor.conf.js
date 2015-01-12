exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './test/frontend/acceptance/*.js'
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

  baseUrl: 'http://localhost:'+ (process.env.HTTP_PORT || '9001'),

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};

