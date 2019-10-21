function generateArrCopy(lib, dest, src) {
    var arr = lib;
    var files = [];

    if (src != undefined) {
        files.push({
            expand: true,
            cwd: src,
            src: ['**'],
            dest: dest
        });
    }

    arr.forEach(function (element, index) {
        var path = arr[index];
        var file = "**";

        if (path.indexOf('.') > 0) {
            file = path.slice(path.lastIndexOf('/')).substring(1);
            path = path.slice(0, path.lastIndexOf('/'));
        }

        files.push({
            expand: true,
            cwd: path,
            src: file,
            dest: dest
        });
    });

    return files;
}

module.exports = function (grunt) {
    function generatePath() {
        var obj = grunt.file.readJSON('config.json');

        if (obj.multisite) {
            var site = grunt.option('site') || grunt.fail.fatal("Por favor digite um site \n");

            console.log(site);

            obj.src.dir += '/' + site;
            obj.dest.dir += '/' + site;
        }

        // GENERATE SOURCE PATHS
        obj.src.scss = obj.src.dir + '/' + obj.src.scss;
        obj.src.scripts = obj.src.dir + '/' + obj.src.scripts;
        obj.src.images = obj.src.dir + '/' + obj.src.images;
        obj.src.fonts = obj.src.dir + '/' + obj.src.fonts;
        obj.src.html = obj.src.dir + '/' + obj.src.html;
        obj.src.vendors = obj.src.dir + '/' + obj.src.vendors;

        //GENERATE DESTINY PATHS
        obj.dest.scss = obj.dest.dir + '/' + obj.dest.scss;
        obj.dest.scripts = obj.dest.dir + '/' + obj.dest.scripts;
        obj.dest.images = obj.dest.dir + '/' + obj.dest.images;
        obj.dest.fonts = obj.dest.dir + '/' + obj.dest.fonts;
        obj.dest.html = obj.dest.dir + '/' + obj.dest.html;
        obj.dest.vendors = obj.dest.dir + '/' + obj.dest.vendors;


        var fs = require('fs');
        if (!fs.existsSync(obj.src.scss))
            grunt.fail.fatal("Digite uma pasta válida \n");

        return obj;
    };

    var app = generatePath();

    var uglifyFiles = [{
        expand: true,
        cwd: '<%= app.src.scripts %>',
        src: (function () {
            var obj = app.scripts;
            var out = ['**/*.{js,json}'];

            Object.keys(obj).map(function (key, index) {
                var arr = obj[key];

                arr.forEach(function (element, index) {
                    out.push('!' + arr[index].replace(app.src.scripts + '/', '').replace(app.src.scripts, ''));
                });
            });

            return out;
        })(),
        dest: '<%= app.dest.scripts %>'
    }, (function () {
        var obj = app.scripts;
        var out = {}

        Object.keys(obj).map(function (key, index) {
            out[app.dest.scripts + '/' + key] = obj[key];
        });

        return out;
    })()]

    grunt.initConfig({
        app: app,
        banner: app.banner ? '/**\n' +
            '* <%= app.title %>\n' +
            '* Desenvolvido por <%= app.author %>\n' +
            '* <%= app.authorUrl %>\n' +
            '* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> \n' +
            '**/\n' : '',

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            preview: {
                files: uglifyFiles
            },
            dist: {
                files: uglifyFiles
            }
        },

        watch: {
            config: {
                files: 'config.json',
                tasks: (function () {
                    app = generatePath();

                    return ['build'];
                })(),
            },

            compass: {
                files: '<%= app.src.scss %>/**/*.scss',
                tasks: ['sass:preview']
            },

            html: {
                files: '<%= app.src.html %>/**/*.html',
                tasks: ['includereplace']
            },

            js: {
                files: ['<%= app.src.scripts %>/**/*'],
                tasks: ['clean:scripts', 'copy:scripts', 'uglify:preview']
            },

            img: {
                files: ['<%= app.src.images %>/**/*'],
                tasks: ['clean:images', 'copy:images', 'sprite']
            },

            sprite: {
                files: ['<%= app.src.images %>/<%= app.sprite.src %>/**/*'],
                tasks: ['sprite', 'copy:images']
            },

            fonts: {
                files: ['<%= app.src.fonts %>/fonts/**/*.{*}'],
                tasks: ['clean:fonts', 'copy:fonts']
            },

            others: {
                files: ['<%= app.src.vendors %>/vendors/**/*.{*}'],
                tasks: ['clean:others', 'copy:others']
            }
        },

        sass: {
            preview: {
                options: {
                    sourceMap: true,
                    outputStyle: 'expanded',
                    sourceComments: true,
                    includePaths: '<%= app.libraries.scss %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.src.scss %>',
                    src: ['**/*.scss'],
                    dest: '<%= app.dest.scss %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            },
            dist: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                    sourceComments: false,
                    includePaths: '<%= app.libraries.scss %>'
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.src.scss %>',
                    src: ['**/*.scss'],
                    dest: '<%= app.dest.scss %>',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },

        uglify: {
            preview: {
                options: {
                    compress: false,
                    beautify: true,
                    mangle: false
                },
                files: uglifyFiles
            },
            dist: {
                options: {
                    compress: {
                        drop_console: true
                    },
                    beautify: false,
                    mangle: false
                },
                files: uglifyFiles
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src.images %>',
                    src: ['**/*.{png,jpg,gif,ico}', '!<%= app.sprite.src %>/**'],
                    dest: '<%= app.dest.images %>'
                }]
            },
            svg: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src.images %>',
                    src: ['**/*.svg'],
                    dest: '<%= app.dest.images %>'
                }]
            },

            fonts: {
                files: generateArrCopy(app.libraries.fonts, app.dest.fonts, app.src.fonts)
            },

            scripts: {
                files: generateArrCopy(app.libraries.scripts, app.dest.scripts)
            },

            others: {
                files: generateArrCopy(app.libraries.vendors, app.dest.vendors)
            }
        },

        sprite: {
            default: {
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                padding: 8,
                src: '<%= app.src.images %>/<%= app.sprite.src %>/*.{png,jpg}',
                dest: '<%= app.src.images %>/<%= app.sprite.file %>',
                destCss: '<%= app.src.scss %>/<%= app.sprite.scssDir %>/<%= app.sprite.scssFile %>',
                cssSpritesheetName: 'sprite',
                imgPath: '/Content/img/<%= app.sprite.file %>'
            },
        },

        clean: {
            css: ['<%= app.dest.scss %>/**/*'],
            scripts: ['<%= app.dest.scripts %>/**/*.{js,json}'],
            images: ['<%= app.dest.images %>/**/*.{ico,png,jpg,jpeg}'],
            fonts: ['<%= app.dest.fonts %>/**/*'],
            others: ['<%= app.dest.vendors %>/**/*'],
            tinypng: ['tinyPng.json'],
            all: ['<%= app.dest.scss %>', '<%= app.dest.html %>', '<%= app.dest.scripts %>', '<%= app.dest.images %>', '<%= app.dest.fonts %>', '<%= app.dest.vendors %>'],
            options: {
                force: true
            }
        },

        usebanner: {
            all: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>',
                    linebreak: false
                },
                files: {
                    src: ['<%= app.dest.scss %>/main.css', '<%= app.dest.scripts %>/<%= app.scripts.file %>']
                }
            }
        },

        tinypng: {
            options: {
                apiKey: '<%= app.tinyApyKey %>',
                checkSigs: true,
                sigFile: 'tinyPng.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            compress: {
                expand: true,
                cwd: '<%= app.src.images %>',
                src: ['**/*.{png,jpg}', '!<%= app.sprite.src %>/**'],
                dest: '<%= app.dest.images %>'
            }
        },

        includereplace: {
            default: {
                files: [{
                    expand: true,
                    cwd: '<%= app.src.html %>',
                    src: ['**/*.html', '!includes/**'],
                    dest: '<%= app.dest.html %>'
                }]
            }
        },

        browserSync: {
            default: {
                bsFiles: {
                    src: [
                        '<%= app.dest.dir %>/**/*'
                    ]
                },
                options: (function () {
                    var obj = {
                        watchTask: true
                    };

                    if (app.server != '' && app.server != undefined)
                        obj.proxy = app.server;
                    else
                        obj.server = ['.', app.dest.html];

                    return obj;
                })(),
                proxy: {
                    target: "app.server",
                    proxyRes: [
                        function (proxyRes, req, res) {
                            console.log(proxyRes.headers);
                        }
                    ]
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['work']);

    grunt.registerTask('work', [
        'build',
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:css',
        'clean:scripts',
        'clean:images',
        'clean:fonts',
        'clean:others',
        'sprite',
        'copy',
        'sass:preview',
        'babel',
        'uglify:preview',
        'includereplace'
    ]);

    grunt.registerTask('dist', [
        'clean:all',
        'copy:svg',
        'copy:fonts',
        'copy:images',
        'copy:scripts',
        'copy:others',
        'sprite',
        'sass:dist',
        'babel',
        'uglify:dist',
        'includereplace',
        'usebanner:all'
    ]);

    grunt.registerTask('dist-tinypng', [
        'tinypng'
    ]);

    grunt.loadNpmTasks('grunt-babel');
};
