// run Grunt in CLI via>> grunt
module.exports = function(grunt) {
  // Do grunt-related things in here

  // Project configuration
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      // concat task configuration goes here
      'js/libs/dest/all.libs.js': 'js/libs/*.js',
    },
    uglify: {
      // uglify task configuration goes here
      'js/libs/dest/all.libs.min.js': 'js/libs/dest/all.libs.js',
    },
  })

  // Load plugins that provide their tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default tasks to be run by >>grunt or >>grunt default
  // to avoid running separately >>grunt uglify    etc.
  grunt.registerTask('default', ['concat', 'uglify']);
};