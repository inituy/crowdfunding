module.exports = function (grunt) {
  var stylesPath = '../styles/*.css';
  var componentsPath = '../components/**/**.css';
  var tmpStylesPath = './tmp/styles.css';
  var watchedStylePaths = [stylesPath, componentsPath];

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      css: {
        files: watchedStylePaths,
        tasks: ['compile:css'],
        options: {
          spawn: false,
          interrupt: true,
          event: ['all'],
        }
      }
    },
    concat: {
      css: {
        src: watchedStylePaths,
        dest: tmpStylesPath,
      },
    },
    cssmin: {
      css: {
        files: {
          '../index.min.css': [tmpStylesPath]
        }
      }
    }
  });

  grunt.registerTask('compile:css', [
    'concat:css',
    'cssmin',
  ])

  grunt.registerTask('default', [ 'compile:css' ]);
}
