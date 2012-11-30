define [
	'components/underscore'
	'components/backbone'
	'models/page'
],(_,Backbone,Page)->

	class Pages extends Backbone.Collection
		model: Page
		initialize:->
			_.bindAll @
			window.myPages = @

		parse:(data)->
			return data.response
