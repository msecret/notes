/*
 * Copyright (c) 2013 Marco Segreto
 * All Rights Reserved
 *
 * Development build file for requirejs.
 *
 */

require.config({
  baseUrl: '../js/',
  dir: '../js/compiled/',

  // Options
  generateSourceMaps: true,
  local: 'en-us',
  logLevel: 0,
  removeCombined: true,
  useStrict: true,
  uglify: {
    beautify: true,
    indent: 2,
    max_line_length: 3000,
    no_mangle: true,
    toplevel: true
  },

  modules: [{
    name: 'notes/notes',
    exclude: [
      'aronnax',
      'underscore'
    ]
  }],

  paths: {
    notes: 'src',
    aronnax: 'lib/components/aronnax/dist/aronnax',
    underscore: 'lib/components/underscore/underscore'
  },

  shim: {
    underscore: {
      exports: '_'
    }
  }
  
});

