define [
  'vendors/lodash'
  'vendors/backbone'
  'collections/photos'
  'models/blog'
], (_, Backbone, Photos, Blog)->

  Backbone.Model.extend
    initialize: ->
      @blog = new Blog()
      @photos = new Photos()
      
    parse: (data)->
      @blog.set @blog.parse data.response.blog
      @photos.set @photos.parse data.response.posts
      return _.pick data, ['meta']