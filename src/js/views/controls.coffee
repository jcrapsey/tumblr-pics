define [
	'components/underscore'
	'components/backbone'
	'components/handlebars'
	'text!templates/controls.html'
],(_,Backbone,Handlebars,controls_html)->

	template = Handlebars.compile controls_html

	class PageView extends Backbone.View

		events:
			"keydown :input" : "onKeydown"
			#mouse
			"touchend .top" : "scrollToTop"
			"touchend .submit" : "tumbl"

		initialize:->
			_.bindAll @
			@render()

		render:()->
			attr = @model.attributes
			@$el.html template attr
			@$input = @$el.find('input')

		scrollToTop:(e)->
			console.log 'scroll to top'
			e.preventDefault();
			window.scrollTo 0,0

		tumbl:(e)->
			console.log 'tumbl'
			e.preventDefault();
			address = @$input.val()
			if @model.get('url') != address
				@model.set('url',address)


		onKeydown:(e)->
			console.log e.which
			if e.which == 13
				e.preventDefault();
				@tumbl(e)
