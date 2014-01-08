module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    bower: {
      install: {
        options: {
          targetDir: 'dev/libraries',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },


    uglify: {
      libraries: {
        files: {
          expand: true,
          cwd: 'dev/libraries',
          src: [
            '**/*.js',
            '!**/tests/**/*.js',
            '!**/test/**/*.js'
          ],
          dest: 'release/libraries'
        }
      },
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },


    requirejs: {
      js: {
        options: {
          appDir: 'dev/js',
          dir: 'release/js',
          keepBuildDir: true,
          baseUrl: '.',
          mainConfigFile: 'dev/js/config.js'
        }
      }
    },


    clean: {
      all: [
        'bower_components',
        'dev',
        'release'
      ]
    }



  });

  // Load the plugins that provide third-party tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-bower-organiser');

  // Default task
  grunt.registerTask('default', [
    'clean',
    'bower:install'
  ]);

};