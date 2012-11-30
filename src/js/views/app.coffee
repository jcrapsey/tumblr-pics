define [
	'components/underscore'
	'components/backbone'
	'components/handlebars'
	'text!templates/app.html'
],(_,Backbone,Handlebars,app_html)->

	template = Handlebars.compile app_html

	class PageView extends Backbone.View
		tagName: 'div'

		initialize:->
			_.bindAll @
			@render()

		render:()->
			attr = {}
			@$el.html template attr
