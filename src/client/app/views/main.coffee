define [
  'vendors/lodash'
  'vendors/jquery'
  'vendors/backbone'
  'global'
  'models/main'
  'models/blog'
  'collections/photos'
  'views/photo'
], (_, $, Backbone, GLOBAL, Main, Blog, Photos, PhotoView)->

  Backbone.View.extend({
    id: 'photo-wall'
    initialize: ->

      @isFetching = false

      tumblr = window.location.hash.split('#')[1] || 'allcreatures.tumblr.com'

      @main = new Main [],
        url: '/api/blog/' + tumblr + '/posts/photo'

      $html = $ 'html'

      fillPage = _.bind ->
        window.scrollTo 0, 0 # prevent jumping to last scroll pos
        if $html[0].clientHeight*2 < $html[0].scrollHeight
          clearInterval fillPageInterval
          return
        @loadPhotos() if not @isFetching
      , @

      fillPageInterval = setInterval fillPage, 100

      @main.photos.on 'add', @onPhotoAdd, @
      GLOBAL.on 'scrollBottom', @onScrollBottom, @
      GLOBAL.on 'scroll', @onScroll, @

      @render()
      
    render: ->
      @$el.masonry
        itemSelector: '.photo'
        isFitWidth: true
        columnWidth: GLOBAL.max_photo_width + 20

    onPhotoAdd: (model)->
      $photoView = new PhotoView({model: model}).$el
      @$el.append $photoView
      @$el.masonry 'appended', $photoView

    onScrollBottom: ($e)->
      @loadPhotos()

    loadPhotos: (offset, limit)->
      offset = offset || GLOBAL.posts
      limit = limit || GLOBAL.post_limit

      return if @isFetching
      @isFetching = true

      @main.fetch
        data:
          limit: limit
          offset: offset
        success: _.bind (data)->
          @$el.masonry 'reload' if offset is 0
          GLOBAL.posts += data.photos.length
          @isFetching = false
        , @

  });