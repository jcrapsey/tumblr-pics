define [
	'components/underscore'
	'components/backbone'
	'models/post'
],(_,Backbone,Post)->

	class Posts extends Backbone.Collection
		model: Post
		initialize:(posts)->
			_.bindAll @

			window.myPosts = @

			@on 'add', @onAdd
			
		onAdd:(post)->
			post.processData()