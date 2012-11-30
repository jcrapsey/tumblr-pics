define [
	'components/underscore'
	'components/backbone'
	'config'
	'collections/posts'
],(_,Backbone,c,Posts)->

	class Page extends Backbone.Model

		defaults:
			width : 0
			height : 0

		url: "/posts"

		initialize:(data,options)->
			_.bindAll @

			#used for page persistance
			@set
				offset:(options?.data?.offset) ? (data?.offset) ? (@attributes?.offset) ? -1


		parse:(response)->
			posts = new Posts
			posts.add response.response.posts, {silent: false}

			data =
				offset : response.response.offset
				posts : posts

			return data

