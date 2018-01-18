/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
var grunt = require('grunt');

require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 
grunt.loadNpmTasks('grunt-strex');

module.exports = function (grunt) {

    grunt.initConfig({
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    './App_Plugins/PoweredByOprum/css/oprum-portal.css': './css/oprum-portal.scss'
                }
            }
        },
    });

    grunt.registerTask('default', ["sass"]);

//module.exports = function (grunt) {
//    grunt.loadNpmTasks('grunt-umbraco-package');

//    grunt.initConfig({
//        pkg: grunt.file.readJSON('package.json'),
//        umbracoPackage: {
//            dist: {
//                src: 'publish',        // Path to a folder containing the files to be packaged
//                dest: 'package',        // Path to a folder to create the package file
//                options: {          // Options for the package.xml manifest
//                    name: 'ONEconnect WhiteSite',
//                    version: '2.0.4.1',
//                    url: 'http://our.umbraco.org/projects/developer-tools/ONEconnect',
//                    license: 'MIT',
//                    licenseUrl: 'https://opensource.org/licenses/MIT',
//                    author: 'PaperWise, Inc.',
//                    authorUrl: 'https://our.umbraco.org/member/153767',
//                    readme: 'Please read this!'
//                }
//            }
//        }
//    });

//    grunt.registerTask('default', ['umbracoPackage']);
};