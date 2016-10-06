/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig({
        ts: {
            base: {
                //src: ['abc'],
                src: ['Scripts/app/boot.ts', 'Scripts/app/**/*.ts'],
                outDir: 'wwwroot/app',
                tsconfig: './tsconfig.json'
            }
        },
        concat: {
            options: {
                separator: '\r\n;\r\n',
            },
            appScripts: {
                src: ['wwwroot/app/**/*.js'],
                dest: 'wwwroot/threejs-all.js',
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    //cwd: 'wwwroot/app',
                    src: [
                        //'**/*.js'
                    ],
                    dest: 'wwwroot/app'
                }]
            },
            options: {
                sourceMap: true
            }
        },

        // Copy all JS files from external libraries and required NPM packages to wwwroot/js
        copy: {
            main: {
                files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        //'Script/app/**/*.js'
                    ],
                    dest: 'wwwroot/app/',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'node_modules/**/*.js'
                    ],
                    dest: 'wwwroot/lib/',
                    filter: 'isFile'
                }]
            }
        },

        // Watch specified files and define what to do upon file changes
        watch: {
            scripts: {
                files: ['Scripts/**/*.js'],
                tasks: ['ts', 'uglify', 'copy']
            }
        }
    });

    // Define the default task so it will launch all other tasks
    // Compile ts files and concat into script
    grunt.registerTask('default', ['ts', 'concat']);
    //grunt.registerTask('compile', ['ts']);
    //grunt.registerTask('combine', ['concat']);
    //grunt.registerTask('uglifyscript', ['ts', 'uglify', 'copy']);
};