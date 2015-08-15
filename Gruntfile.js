module.exports = function (grunt) {
    grunt.initConfig({

        meta: {
            // general
            appName:            'YourProjectName',
            appNameMin:         '<%= meta.appName %>.min',
            framework:          'bootstrap',
            tempDir:            'temp',

            //fonts
            fontSrc:           'fonts/',
            fontDist:          '<%= meta.Dist %><%= meta.fontSrc %>',

            // css
            cssName:            '.css',
            cssDist:            'dist/css/',
            appCssDist:         '<%= meta.appName %><%= meta.cssName %>',

            // preprocessor
            preprocessorName:   '.scss',
            cssSrc:             'sass/',
            appCssSrc:          '<%= meta.appName %><%= meta.preprocessorName %>',

            // js
            jsName:             '.js',
            jsDist:             'dist/js/',
            jsSrc:              'js/',
            appJsDist:          '<%= meta.appName %><%= meta.jsName %>',
            appJsSrc:           '<%= meta.appName %><%= meta.jsMinName %>',

            // images
            imgDir:             'img/tomin/',
            imgDirDist:         'dist/img/',

            // deploy
            Dist:               'dist/',
            productionDist:     '/wp-content/themes/YOURDIRECTORY/dist/',
            host:               'reclamar.ftp.ukraine.com.ua'
        },

        sass: {
            dev: {
                files: {
                    '<%= meta.cssDist %><%= meta.appCssDist %>' : '<%= meta.cssSrc %><%= meta.appCssSrc %>'
                },
                options: {
                    style: 'nested'
                }
            },


            production: {
                files: {
                    '<%= meta.cssDist %><%= meta.appCssDist %>' : '<%= meta.cssSrc %><%= meta.appCssSrc %>'
                },
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },

        postcss: {
            options: {
                map: true,

                processors: [
                    require('autoprefixer-core')({browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'ios 7', 'android 4']}),
                ]

            },
            dist: {
                src: '<%= meta.cssDist %>*<%= meta.cssName %>'
            }
        },

        concat: {
            js:{
                src:  '<%= meta.jsSrc %>**/*<%= meta.jsName %>',
                dest: '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>'
            }
        },

        uglify: {
            js: {
                files: [{
                    dest: '<%= meta.jsDist %><%= meta.appNameMin %><%= meta.jsName %>',
                    src:  '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>'
                }]
            }
        },

        "ftp-deploy": {
            dev: {
                auth: {
                    host: '<%= meta.host %>',
                    port: 21,
                    authKey: 'key'
                },
                src: '<%= meta.Dist %>',
                dest: '<%= meta.Dist %>',
                exclusions: ['<%= mete.fontDist %>**/*']
            },
            production: {
                auth: {
                    host: '<%= meta.host %>',
                    port: 21,
                    authKey: 'keyProd'
                },
                src: '<%= meta.Dist %>',
                dest: '<%= meta.productionDist %>',
                exclusions: ['<%= mete.fontDist %>**/*']
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.imgDir %>',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= meta.imgDirDist %>'
                    }
                ]
            }
        },

        mkdir: {
            all: {
                options: {
                    create: ['fonts', 'js', 'images', 'img/tomin', 'dist/js', 'dist/css', 'dist/img' ]
                }
            }
        },

        copy: {
            jsFile: {
                expand: true,
                cwd: 'temp',
                src: 'scripts<%= meta.jsName %>',
                dest: '<%= meta.jsSrc %>',
                filter: 'isFile'
            },
            sourceFile: {
                expand: true,
                cwd: 'temp',
                src: 'styles<%= meta.preprocessorName %>',
                dest: '<%= meta.cssSrc %>',
                filter: 'isFile'
            },

            bootstrap: {
                expand: true,
                cwd: 'bower_components/bootstrap-sass/assets/stylesheets/',
                src: '**',
                dest: '<%= meta.cssSrc %>',
                filter: 'isFile'
            },
            fontAwesomeSource: {
                expand: true,
                cwd: 'bower_components/font-awesome/scss/',
                src: '**',
                dest: '<%= meta.cssSrc %>font-awesome',
                filter: 'isFile'
            },
            fontAwesomeFonts:{
                files:[
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: 'fontawesome-webfont.woff2', dest: '<%= meta.fontSrc %>', filter: 'isFile' },
                    { expand: true, cwd: 'bower_components/font-awesome/fonts/', src: 'fontawesome-webfont.woff', dest: '<%= meta.fontSrc %>', filter: 'isFile' }
                ]
            },
            fonts:{
                expand: true,
                cwd: '<%= meta.fontSrc %>',
                src: '**',
                dest: '<%= meta.fontDist %>',
                filter: 'isFile'
            },
            tempFiles:{
                files:[
                    { expand: true, cwd: 'temp', src: '_dev-extend<%= meta.preprocessorName %>',    dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: '_dev-variables<%= meta.preprocessorName %>', dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: '_fonts<%= meta.preprocessorName %>',         dest: '<%= meta.cssSrc %><%= meta.framework %>/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: '_media-rules<%= meta.preprocessorName %>',   dest: '<%= meta.cssSrc %><%= meta.framework %>/mixins/', filter: 'isFile' },
                    { expand: true, cwd: 'temp', src: '_dev-mixins<%= meta.preprocessorName %>',    dest: '<%= meta.cssSrc %><%= meta.framework %>/mixins/', filter: 'isFile'}
                ]
            },
            owlCarousel2: {
                expand: true,
                cwd: 'bower_components/owl-carousel2/src/scss/',
                src: '**',
                dest: '<%= meta.cssSrc %>owl-carousel2',
                filter: 'isFile'
            },
            magnificPopUp: {
                expand: true,
                cwd: 'bower_components/magnific-popup/src/css/',
                src: '**',
                dest: '<%= meta.cssSrc %>magnific-popup',
                filter: 'isFile'
            }
        },
        rename: {
            sourceFile:{
                src: '<%= meta.cssSrc %>styles<%= meta.preprocessorName %>',
                dest: '<%= meta.cssSrc %><%= meta.appName %><%= meta.preprocessorName %>'
            },
            sourceJs:{
                src: '<%= meta.jsSrc %>scripts<%= meta.jsName %>',
                dest: '<%= meta.jsSrc %><%= meta.appName %><%= meta.jsName %>'
            }
        },

        clean: {
            css: [ '<%= meta.cssDist %>' ],
            start: ['<%= meta.cssDist %>**/*', '<%= meta.jsDist %>**/*'],
            tmp: [ '<%= meta.jsDist %><%= meta.appName%>.tmp<%= meta.jsName %>' ],
            sassSrc: ['bower_components/bootstrap-sass/assets/stylesheets/'],
            fa: ['bower_components/font-awesome/scss/'],
            popUp: ['bower_components/magnific-popup/src/css/'],
            owl: ['bower_components/owl-carousel2/src/scss/'],
            files: [
                '<%= meta.tempDir %>',
                '<%= meta.cssSrc %>font-awesome/_path.scss',
                '<%= meta.cssSrc %>_bootstrap-compass.scss',
                '<%= meta.cssSrc %>_bootstrap-mincer.scss',
                '<%= meta.cssSrc %>_bootstrap-sprockets.scss',
                '<%= meta.cssSrc %>owl-carousel2/_mixins.scss'
            ],
            img: [ '<%= meta.imgDir %>' ]
        },

        watch: {
            dev:{
                files: [ '<%= meta.cssSrc %>', '<%= meta.cssSrc %>{,*/,*/*/}*{<%= meta.preprocessorName %>,sass}', '<%= meta.jsSrc %>**/*<%= meta.jsName %>' ],
                tasks: [ 'clean:css', 'sass:dev', 'postcss' /* , 'ftp-deploy:dev'*/ ]
            },
            //production:{
            //    files: [ '<%= meta.cssSrc %>', '<%= meta.cssSrc %>{,*/,*/*/}*{<%= meta.preprocessorName %>,sass}', 'js/**/*.js' ],
            //    tasks: [ 'clean:start', 'sass:production', 'postcss', 'concat:js', 'uglify:js', 'clean:tmp', 'ftp-deploy:production']
            //}
        }

    });


    require('load-grunt-tasks')(grunt);
    require('grunt-register-tasks')(grunt, {

        default: [
            'clean:css', 'sass:dev', 'postcss' /* , 'ftp-deploy:dev'*/
        ],

        production: [
            'clean:start', 'sass:production', 'postcss', 'concat:js', 'uglify:js', 'clean:tmp' /* , 'ftp-deploy:production'*/
        ],
        /*when */

        init: [
            'mkdir',
            'copy:jsFile',
            'copy:sourceFile',
            'rename:sourceFile',
            'rename:sourceJs',
            'copy:bootstrap',
            'copy:fontAwesomeSource',
            'copy:fontAwesomeFonts',
            'copy:owlCarousel2',
            'copy:magnificPopUp',
            'copy:tempFiles',
            'clean:sassSrc',
            'clean:files'
        ],
        copyfont:       'copy:fonts',
        deleteRepeat: 	[ 'clean:sassSrc', 'clean:fa', 'clean:owl', 'clean:popUp' ],
        image:          [ 'imagemin:png', 'clean:img' ]

    });

};