'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  var target = [(grunt.option('target') || 'dev')];

  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-ngdocs');

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    ngconstant: {
      options: {
        dest: 'app/scripts/constants.js',
        name: 'constants',
        constants: require('./constants.json')[target]
      },
      link: {}
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['{.tmp,<%= yeoman.app %>}/scripts/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      docsresources: {
        files: ['docs-resources/*.*'],
        tasks: ['ngdocs']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      templates: {
        files: ['<%= yeoman.app %>/**/*.html'],
        tasks: ['html2js:src']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          'docs/**/*.*',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '127.0.0.1',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          port: 9002,
          base: '<%= yeoman.dist %>'
        }
      },
      coverage: {
        options: {
          open: true,
          port: 9002,
          base: [
            'coverage'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }],
        force: true
      },
      server: '.tmp',
      docs: 'app/docs'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['ie >= 10', 'last 2 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/styles/',
          src: 'main.css',
          dest: '.tmp/concat/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        specify: '<%= yeoman.app %>/styles/main.scss',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',		//Doesn't work for gifs
          dest: '<%= yeoman.dist %>/images'
        },
          {
            expand: true,
            cwd: '<%= yeoman.app %>/manual_components/kendo-ui/styles/Silver',
            src: '{,*/}*.{png,jpg,jpeg}',	//Doesn't work for gifs
            dest: '<%= yeoman.dist %>/styles/Silver'
          }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{webp}',
            'fonts/*',
            'manual_components/**/*.*',
            'web.config'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/manual_components/bootstrap/fonts',
          dest: '<%= yeoman.dist %>/fonts',
          src: [
            '*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/docs',
          dest: '<%= yeoman.dist %>/docs',
          src: [
            '**/*.*'
          ]
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            '*.gif'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'compass',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    protractor: {
      options: {
        configFile: 'e2e.conf.js',
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          baseUrl: 'http://localhost:9001',
          params: {
            target: target
          }
        }
      },
      src: {},	//Prevents grunt from running dist by default
      dist: {
        options: {
          args: {  // Target-specific arguments
            baseUrl: 'http://localhost:9002',
            params: {
              target: target
            }
          }
        }
      }
    },
    ngdocs: {
      all: ['app/scripts/**/*.js'],
      options: {
        dest: 'app/docs',
        html5Mode: false,
        styles: ['docs-resources/styles.css'],
        title: 'MISys Enterprise Documentation'
      }
    },
    html2js: {
      options: {
        module: 'mi.templates',
        quoteChar: '\'',
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        singleModel: true
      },
      src: {
        src: ['<%= yeoman.app %>/views/**/*.html'],
        dest: '<%= yeoman.app %>/scripts/templates.js',
        options: {
          base: '<%= yeoman.app %>'
        }
      },
      dist: {
        src: ['<%= yeoman.dist %>/views/**/*.html'],
        dest: '<%= yeoman.dist %>/scripts/templates.js',
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'clean:docs',
      'ngdocs',
      'ngconstant:link',
      'html2js:src',
      'jshint',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('coverage', [
    'ngconstant:link',
    'html2js:src',
    'jshint',
    'connect:test',
    'karma',
    'connect:coverage:keepalive'
  ]);

  grunt.registerTask('test', function (testType, target) {
    var tasks = [
      'ngconstant:link',
      'html2js:src',
      'jshint',
      'concurrent:test',
      'autoprefixer'
    ];

    if (target === undefined) {
      tasks.push('connect:test');
    } else {
      tasks.push('connect:dist');
    }

    if (testType === undefined) {
      tasks.push('karma');
      tasks.push('protractor:src');
    } else {
      if (testType === 'e2e') {
        if (target === undefined) {
          tasks.push('protractor:src');
        } else {
          tasks.push('protractor:' + target);
        }
      } else if (testType === 'unit') {
        tasks.push('karma');
      } else {
        grunt.fatal('Test type must be e2e, unit, or undefined.');
      }
    }

    grunt.task.run(tasks);
  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', [
    'ngconstant:link',
    'html2js:src',
    'jshint',
    //'karma',
    'clean:docs',
    'ngdocs',
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'ngmin',
    'autoprefixer',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'html2js:dist',
    'connect:dist'
    //'protractor:dist'
  ]);
};
