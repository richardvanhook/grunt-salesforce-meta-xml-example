/*
 * grunt-salesforce-meta-xml
 *
 *
 * Copyright (c) 2014 Richard Vanhook
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: ['tmp'],

    copy: {
      main: { files: [
        {expand:true,cwd:'src',src:'**',dest:'tmp'}
      ]}
    },

    salesforcemetaxml: {
      options:{
        apexpage:{
          apiVersion:'30.0',
          description:'Here is a custom description <%=new Date().toISOString()%>'
        },
        emailtemplate:{
          subject:'test abc 123',
        },
        'document':{
          'public': true
        }
      },
      main:{
        expand:true,
        cwd:'tmp',
        src:'**'
      }
    },

    antdeploy: {
      options: {
        root: 'tmp',
        apiversion: '32.0',
        useEnv: true
      },
      all: {
        pkg: {
          apexclass      : ['*'],
          apexcomponent  : ['*'],
          apexpage       : ['*'],
          apextrigger    : ['*'],
          dashboards     : ['*'],
          documents      : ['*'],
          emailtemplate  : ['*'],
          reports        : ['*'],
          staticresources: ['*']
        }
      }
    }

  });

  grunt.registerTask('default', ['clean','copy','salesforcemetaxml','antdeploy']);

};
