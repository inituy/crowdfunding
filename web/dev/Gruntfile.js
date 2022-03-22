module.exports = function (grunt) {
  var componentsPath = '../components/**/**.css';
  var tmpStylesPath = './tmp/styles.css';

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      css: {
        files: [componentsPath],
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
        src: [componentsPath],
        dest: tmpStylesPath
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
