define [
	'components/underscore'
	'components/backbone'
	'components/handlebars'
	'config'
	'text!templates/post.html'
],(_,Backbone,Handlebars,c,post_html)->

	template = Handlebars.compile post_html

	class PostView extends Backbone.View
		tagName: 'article'
		className: 'post loading box col1'
		initialize:->

			attr = @model.attributes

			_.bindAll @

			#Manage the loading of images
			@$image = $(document.createElement('img'))
			@$image.attr('src',attr.image.url)
			@$image.load @onImageLoad
			@$image.error @onImageError

			@render()

		render:->
			attr = @model.attributes
			
			@$el.html template attr

			$photo = @$el.find('.photo');
			$photo.css({width:attr.image.width,height:attr.image.height})
			$photo.append @$image

		onImageLoad:->
			@$el.removeClass 'loading'

		onImageError:()->
			@$el.addClass 'error'

