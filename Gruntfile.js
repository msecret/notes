module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: "// Copyright (c) <%= grunt.template.today('yyyy') %>" +
                  "<%= pkg.author.name %>\n" +
              "// All Rights Reserved\n" +
              "// <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
              "// <%= grunt.template.today('yyyy-mm-dd') %>\n" +
              "// Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> \n"
    },
    requirejs: {
      options: {
        mainConfigFile: "build/dev.build.js"
      },
      compile: {
        options: {
          wrap: {
            start: "<%= pkg.author.name %>" +
                   "(function() {",
            end: "}());"
          }
        }
      },
      concat: {
        options: {
          optimize: 'none',
          wrap: {
            start: "<%= meta.banner %>"
          }
        }
      }
    }
    jasmine: {
      options: {
        helpers: [
          'js/lib/components/*.js',
          'js/lib/components/sinonjs/sinon.js',
          'js/lib/components/jasmine-sinon/lib/jasmine-sinon.js',
          'js/lib/components/underscore/underscore.js',
          'js/test/matchers.js'
        ],
        keepRunner: true,
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: 'js/src'
          },
          requireConfigFile: 'build/dev.build.js'
        }
      },
      test: {
        options: {
          specs: 'js/test/**/*_test.js'
        }
      }
    },
  });
}
