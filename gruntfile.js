'use strict';

module.exports = function (grunt) {
    grunt.config.set('src', 'src/');
    grunt.config.set('dist', 'dist/');
    grunt.config.set('useRootPath', false);

    grunt.initConfig({

        conf: {
            src: grunt.config.get('src'),
            dist: grunt.config.get('dist')
        },

        clean: {
            options: {
                force: true
            },
            files: [
                '<%= conf.dist %>**/*.html',
                '<%= conf.dist %>css',
                '<%= conf.dist %>js',
                '<%= conf.dist %>img',
                '!<%= conf.dist %>dev/**'
            ]
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>img',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= conf.dist %>img'
                }]
            }
        },

        cwebp: {
            files: {
                expand: true,
                cwd: '<%= conf.src %>img',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: '<%= conf.dist %>img'
            },
            options: {
                //binpath: require('webp-bin').path,
                preset: 'photo',
                verbose: true,
                quality: 80,
                alphaQuality: 80,
                compressionMethod: 6,
                segments: 4,
                psnr: 42,
                sns: 50,
                filterStrength: 40,
                filterSharpness: 3,
                simpleFilter: true,
                partitionLimit: 50,
                analysisPass: 6,
                multiThreading: true,
                lowMemory: false,
                alphaMethod: 0,
                alphaFilter: 'best',
                alphaCleanup: true,
                noAlpha: false,
                lossless: false
            }
        },

        uglify: {
            js: {
                options: {
                    banner: '/*! Copyright:  */\n'
                },
                files: {
                    expand: true,
                    cwd: '<%= conf.src %>/js',
                    src: '**/*.js',
                    dest: '<%= conf.dist %>/js'
                }
            }
        },

        prettier: {
            options: {
                banner: '/*! Copyright:  */\n'
            },
            files: {
                src: ['<%= conf.dist %>js/scripts.js']
            }
        },

        pug: {
            html: {
                options: {
                    pretty: true,
                    spawn: false,
                    data: {
                        debug: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>pug',
                    src: ['**/*.pug', '!_layouts/**', '!_parts/**', '!_mixins/**'],
                    dest: '<%= conf.dist %>',
                    ext: '.html'
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded', // nested, compact, compressed, expanded.
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>sass',
                    src: ['*.sass'],
                    dest: '<%= conf.dist %>css',
                    ext: '.css'
                }]
            }
        },

        bootstrap: {
            dist: {
                options: {
                    style: 'expanded', // nested, compact, compressed, expanded.
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>bootstrap',
                    src: ['*.scss'],
                    dest: '<%= conf.dist %>css/bootstrap',
                    ext: '.css'
                }]
            }
        },

        watch: {
            pug: {
                files: ['<%= conf.src %>pug/**/*.pug'],
                tasks: ['pug']
            },
            sass: {
                files: ['<%= conf.src %>sass/**/*.sass'],
                tasks: ['sass']
            },
            js: {
                files: ['<%= conf.src %>js/*.js'],
                tasks: ['uglify']
            }
        },

        copy: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>js',
                    src: ['*.js'],
                    dest: '<%= conf.dist %>js'
                }]
            },
            svg: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>img',
                    src: ['**/*.svg'],
                    dest: '<%= conf.dist %>img'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>sass/fonts',
                    src: ['**/*'],
                    dest: '<%= conf.dist %>css/fonts'
                }]
            },
            sass: {
                files: [{
                    expand: true,
                    cwd: '<%= conf.src %>sass',
                    src: ['*.sass'],
                    dest: '<%= conf.dist %>sass'
                }]
            },
        },

        browserSync: {
            dev: {
                options: {
                    watchTask: true,
                    server: "./dist",
                    startPath: "/index.html",
                    // server: '<%= conf.dist %>',
                    // startPath: grunt.config.get('useRootPath') ? '<%= conf.dist %>' : process.cwd().replace(/\\/g, '/').split('/').reverse()[1],
                    files: ['<%= conf.dist %>**/*.{html,css,js}', '!<%= conf.src %>'],
                }
            }
        },

        validation: {
            options: {
                reset: true,
                stoponerror: false,
                generateReport: false,
                reportpath: false
            },
            files: {
                src: [
                    '<%= conf.dist %>**/*.html',
                    '!<%= conf.dist %>dev/**',
                    '!<%= conf.dist %>wp/**',
                    '!<%= conf.dist %>node_modules/**'
                ]
            }
        },

        htmllint: {
            defaultOptions: {
                options: {
                    'attr-bans': ['align', 'background', 'bgcolor', 'border', 'frameborder', 'longdesc', 'marginwidth', 'marginheight', 'scrolling', 'style'],
                    'attr-name-style': 'dash',
                    'attr-req-value': false,
                    'doctype-first': true,
                    'doctype-html5': true,
                    'force': true,
                    'id-class-no-ad': false,
                    'id-class-style': 'dash',
                    'indent-style': 'spaces',
                    'indent-width': 2,
                    'line-end-style': false,
                    'tag-bans': ['style'],
                },
                src: [
                    '<%= conf.dist %>**/*.html',
                    '!<%= conf.dist %>dev/**',
                    '!<%= conf.dist %>wp/**',
                    '!<%= conf.dist %>node_modules/**'
                ]
            }
        },

        csslint: {
            all: {
                options: {
                    'adjoining-classes': false,
                    'box-model': false,
                    'box-sizing': false,
                    'compatible-vendor-prefixes': false,
                    'display-property-grouping': false,
                    'duplicate-background-images': false,
                    'fallback-colors': false,
                    'floats': false,
                    'font-sizes': false,
                    'force': true,
                    'gradients': false,
                    'ids': false,
                    'import': 1,
                    'important': false,
                    'known-properties': false,
                    'order-alphabetical': false,
                    'outline-none': false,
                    'overqualified-elements': false,
                    'qualified-headings': false,
                    'selector-newline': false,
                    'star-property-hack': false,
                    'text-indent': false,
                    'unique-headings': false,
                    'universal-selector': false,
                    'unqualified-attributes': false,
                    'vendor-prefix': 2,
                    'zero-units': false
                },
                src: [
                    '<%= conf.dist %>css/**/*.css',
                    '!<%= conf.dist %>css/bootstrap.css'
                ]
            }
        },

        eslint: {
            options: {
                overrideConfigFile: '.eslintrc',
                format: 'stylish',
                failOnError: false,
                fix: true
            },
            target: ['<%= conf.dist %>js/scripts.js']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.loadNpmTasks('grunt-prettier');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-htmllint');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-cwebp');

    /* grunt.registerTask('build', [
        'clean',
        'pug',
        'sass',
        'copy:js',
        'copy:svg',
        'copy:fonts',
        'prettier',
        'imagemin',
        'lint',
    ]); */

    /* grunt.registerTask('default', [
        'clean',
        'pug',
        'sass',
        'copy:js',
        'copy:svg',
        'copy:fonts',
        'prettier',
        'imagemin',
        'lint',
        'browserSync',
        'watch'
    ]); */

    grunt.registerTask('quick', [
        'pug',
        /* 'sass', */
        /* 'copy:js', */
        /* 'prettier',
        'eslint', */
        //'browserSync',
        'watch'
    ]);

    /* grunt.registerTask('lint', [
        'validation',
        'htmllint',
        'csslint',
        'eslint',
    ]); */

};