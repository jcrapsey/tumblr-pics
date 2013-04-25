require.config
  baseUrl: './app/'
  paths:
    'vendors/jquery'    : '../vendors/jquery/jquery'
    'vendors/backbone'  : '../vendors/backbone/backbone'
    'vendors/lodash'    : '../vendors/lodash/dist/lodash'
    'vendors/handlebars': '../vendors/handlebars/handlebars'
    'vendors/masonry'   : '../vendors/jquery-masonry/jquery.masonry'

    'templates': '../templates'
    #requirejs plugins
    'text': '../vendors/text/text'
  shim:
    'vendors/backbone':
      deps: ['vendors/jquery','vendors/lodash']
      exports: 'Backbone'
    'vendors/handlebars':
      exports: 'Handlebars'
    'vendors/jquery':
      exports: 'jQuery'
    'vendors/lodash':
      exports: '_'
    'vendors/masonry':
      deps: ['vendors/jquery']

require [
  'vendors/lodash'
  'vendors/jquery'
  'vendors/masonry'
  'global'
  'views/main'
], (_, $, m, GLOBAL, MainView)->

  mainView = new MainView();

  $('body').append mainView.el
