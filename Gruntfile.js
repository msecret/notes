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
    },

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

    jshint: {
      files: ['Gruntfile.js', 'js/src/**/*.js', 'js/test/**/*.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        loopfunc: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        sub: true,
        undef: true,
        boss: true,
        debug: true,
        eqnull: true,
        multistr: true,
        // environments
        browser: true,
        devel: true,
        node: true,

        globals: {
          afterEach: true,
          aronnax: true,
          beforeEach : true,
          define: true,
          Benchmark: true,
          describe : true,
          expect : true,
          goog: true,
          require: true,
          jasemine: true,
          sinon: true,
          module: true,
          waitsFor: true,
          it : true,
          _: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('concat', 'requirejs:concat');
  grunt.registerTask('compile', 'requirejs:compile');
  grunt.registerTask('test', 'jasmine:test');

  grunt.registerTask('default', ['lint', 'concat', 'compile', 'test']);
  
};
