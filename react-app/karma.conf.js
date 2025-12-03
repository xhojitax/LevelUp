module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'jasmine-examples/utilidades.js',
      'jasmine-examples/utilidades.spec.js'
    ],

    preprocessors: {
      'jasmine-examples/utilidades.js': ['coverage']
    },

    reporters: ['progress', 'kjhtml', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'coverage-jasmine/'
    },

    client: {
      clearContext: false   // ⚠ NECESARIO PARA MOSTRAR REPORTE EN EL NAVEGADOR
    },

    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage'
    ]
  });
};
