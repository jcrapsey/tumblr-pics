define [
  'vendors/lodash'
  'vendors/backbone'
  'global'
], (_, Backbone, GLOBAL)->

  Backbone.Model.extend
    parse: (data, i)->
      procData = _.pick data, ['id', 'timestamp', 'photos']
      procData.index = i
      procData.photos = _.map procData.photos, (photo, i, photos)->
        photo.selected_size = _.find photo.alt_sizes, (photo)->
          return photo if photo.width <= GLOBAL.max_photo_width
        photos[i] = _.pick photo, ['original_size', 'selected_size']
      return procData