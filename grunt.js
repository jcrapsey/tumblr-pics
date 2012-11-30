module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-requirejs');

  // Project configuration.
  grunt.initConfig({

    // Coffee Script Configurations
    coffee: {
        options: {
            bare: true,
            flatten : false
        },
        compile : {
            files : {
              "lib/*.js" : "src/*.coffee",
              "lib/js/*.js" : "src/js/**/*.coffee"
            }
        }
    },

    // Jade File Configurations
    jade : {
      compile: {
        options: {
          flatten : false
        },
        files: {
          "lib/index.html" : "src/index.jade",
          "lib/index-live.html" : "src/index-live.jade",
          "lib/js/templates/wall.html": "src/js/templates/wall.jade",
          "lib/js/templates/app.html": "src/js/templates/app.jade",
          "lib/js/templates/page.html": "src/js/templates/page.jade",
          "lib/js/templates/controls.html": "src/js/templates/controls.jade",
          "lib/js/templates/post.html": "src/js/templates/post.jade"
        }
      }
    },

    stylus : {
      compile : {
        files: {
          'lib/css/style.css': 'src/css/style.styl'
        }
      }
    },

    // Watch command
    watch: {
      files: 'src/**/**/*',
      tasks: ['trans']
    },

    //Require JS config
    requirejs: {
        baseUrl: __dirname +'/' ,
        name: "lib/js/main",
        mainConfigFile: "lib/js/main.js",
        preserveLicenseComments: false,
        useSourceUrl: false,
        paths : {
            
            'requireLib' : 'components/requirejs/index',
            'collections':'lib/js/collections',
            'models':'lib/js/models',
            'templates':'lib/js/templates',
            'views':'lib/js/views',
            'config':'lib/js/config',
            'layout':'lib/js/layout',
            'router'     :'lib/js/router'

        },
        deps : ['requireLib'],
        wrap: {
            start: "(function() {",
            end: "}());"
        },
        optimize: "uglify",
        out: "./build/js/app.js"
    },

    //Clean config
    clean: {
        build: ['./build'],
    },

    //Copy Config
    copy: {

        build: {
          files: {
            "./dist/": "./build/**/*",
            "./dist/style.css": "./lib/css/style.css",
            "./dist/index.html": "./lib/index-live.html",
            "./dist/manifest.webapp":"./lib/manifest.webapp"
          }
        },

        trans: {
          files: {
            "./lib/": [ "./src/**/*.js", "./src/**/*.css", "./src/**/*.html", "./src/**/*.webapp" ]
          }
        },

        media: {
            files: {
                "./build/media/": "./media/**/*"
            }
        }
    }

  });

  // Setup
  grunt.registerTask('setup',['',''])
  
  // Build Tasks
  grunt.registerTask('build','requirejs copy:build clean:build');

  // Transpile task.
  grunt.registerTask('trans', 'Transpile Coffee and Jade', function(){
    grunt.log.write('\nTranspiling ...\n')
    grunt.task.run('coffee jade stylus copy:trans');
  });

  // Default task.
  grunt.registerTask('default', '');

  //var watermark = ['',' ____  _                             __ _   ','|  _ \\| | __ _ _   _  ___ _ __ __ _ / _| |_ ','| |_) | |/ _` | | | |/ __| \'__/ _` | |_| __|','|  __/| | (_| | |_| | (__| | | (_| |  _| |_ ','|_|   |_|\\__,_|\\__, |\\___|_|  \\__,_|_|  \\__|','---------------|___/------------------------',''].join('\n');
  var watermark = ['','','----------------------------------------------------------',' ____  _     _             ____                           ','|  _ \\(_)___| | ___   _   / ___| __ _ _ __ ___   ___  ___ ','| |_) | / __| |/ / | | | | |  _ / _` | \'_ ` _ \\ / _ \\/ __|','|  _ <| \\__ \\   <| |_| | | |_| | (_| | | | | | |  __/\\__ \\','|_| \\_\\_|___/_|\\_\\\\__, |  \\____|\\__,_|_| |_| |_|\\___||___/','------------------|___/-----------------------------------',''].join('\n')
  console.log(watermark);
};
