module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    
    files: [
      'jasmine-examples/utilidades.js',
      'jasmine-examples/utilidades.spec.js'
    ],
    
    exclude: [],
    
    preprocessors: {
      'jasmine-examples/utilidades.js': ['coverage']
    },
    
    reporters: ['progress', 'coverage'],
    
    coverageReporter: {
      type: 'html',
      dir: 'coverage-jasmine/'
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    
    browsers: ['ChromeHeadless'],
    
    singleRun: true,
    concurrency: Infinity
  })
}