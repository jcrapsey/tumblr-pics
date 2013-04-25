define [
  'vendors/handlebars'
  'vendors/backbone'
  'text!templates/photo.html'
], (Handlebars, Backbone, photoHtml)->

  photoTemplate = Handlebars.compile photoHtml

  Backbone.View.extend
    tagName: 'div'
    className: 'photo'
    initialize: ->
      @render()

    render: ->
      @$el.html photoTemplate @model.attributes

      $wrapper = @$el.find '.wrapper'

      $wrapper.css
        width: $wrapper.data 'width'
        height: $wrapper.data 'height'

      $img = @$el.find 'img'

      $img.on 'load', ->
        $img.removeClass 'hide'
