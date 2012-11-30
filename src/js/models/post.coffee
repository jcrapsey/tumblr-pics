define [
	'components/underscore'
	'components/backbone'
	'config'
],(_,Backbone,c)->

	class Post extends Backbone.Model
		initialize:(data,collection)->
			_.bindAll @

		processData:->

			attr = @attributes

			return if attr.image

			image_sizes = _.filter attr.photos[0].alt_sizes, @filter_sizes

			if image_sizes.length > 0
				attr.image = image_sizes[0]
			else
				attr.image = attr.photos[0].alt_sizes[attr.photos[0].alt_sizes.length-1]

			#set the new image sizes
			attr.image.height = Math.floor((c.IMAGE_WIDTH/attr.image.width)*attr.image.height)
			attr.image.width = c.IMAGE_WIDTH

			width = attr.image.width + (c.CELL_PADDING * 2) + (c.CELL_SPACING * 2)
			height = attr.image.height + (c.CELL_PADDING * 2) + (c.CELL_SPACING * 2)

			@set
				width:width
				height:height

		filter_sizes : (data)->
			return data if data.width <= c.IMAGE_WIDTH