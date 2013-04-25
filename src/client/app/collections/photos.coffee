define [
  'vendors/lodash'
  'vendors/backbone'
  'models/photo'
], (_, Backbone, Photo)->

  Backbone.Collection.extend
    model: Photo
    parse: (data)->
      return _.map data, Photo.prototype.parse