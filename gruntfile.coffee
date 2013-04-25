module.exports = (grunt)->  

  # Configuration #
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    requirejs:
      build:
        options:
          preserveLicenseComments: false
          useSourceUrl: false
          baseUrl: './lib/client/app/'
          name: 'main'
          mainConfigFile: 'lib/client/app/main.js'
          out: 'dist/client/app/main.js'
          optimize: 'uglify'
          deps: ['../vendors/requirejs/require']
    coffee:
      options:
        bare: true
      compile:
        expand: true
        cwd: 'src'
        src: [ '**/*.coffee' ]
        dest: 'lib'
        ext: '.js'
    jade:
      templates:
        files: [{
          expand: true
          cwd: 'src/client/templates/'
          src: ['**/*.jade']
          dest: 'lib/client/templates/'
          ext: '.html'
        }]
      html:
        options:
          data:
            debug: true
            isBuild: false
        files:
          'lib/client/index.html': 'src/client/index.jade'
      build:
        options:
          data:
            debug: true
            isBuild: true
        files:
          'dist/client/index.html': 'src/client/index.jade'
    less:
      compile:
        files:
          'lib/client/styles/main.css': 'src/client/styles/main.less'
    clean:
      html: ['lib/**/*.html','!lib/client/vendors/**/*.html']
      js: ['lib/**/*.js','!lib/client/vendors/**/*.js']
      css: ['lib/**/*.css','!lib/client/vendors/**/*.css']
      dist: ['dist']
    copy:
      build:
        files: [{
            expand: true
            cwd: 'lib/'
            src: [
              'client/styles/main.css',
              'server/**/*.js'
            ]
            dest: 'dist/'
          }]
    watch:
      jade:
        options:
          nospawn: false
        files: ['src/**/*.jade']
        tasks: ['clean:html','jade:templates','jade:html']
      coffee:
        options:
          nospawn: false
        files: ['src/**/*.coffee']
        tasks: ['clean:js','coffee:compile']
      less:
        options:
          nospawn: false
        files: ['src/**/*.less']
        tasks: ['clean:css','less:compile']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-requirejs'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-jade'

  grunt.registerTask 'build', [
    'clean:html','clean:js','clean:css','clean:dist',
    'jade:templates','jade:html','coffee:compile','less:compile',
    'requirejs:build','jade:build','copy:build'
  ]



