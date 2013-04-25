define [
  'vendors/backbone'
], (Backbone, Photo)->

  Backbone.Model.extend
    parse: (data)->
      return data