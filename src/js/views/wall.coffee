define [
	'components/underscore'
	'components/backbone'
	'components/handlebars'
	'views/page'
	'text!templates/wall.html'
],(_,Backbone,Handlebars,PageView,wall_html)->

	template = Handlebars.compile wall_html

	class AppView extends Backbone.View
		className: 'app-view'
		initialize:->
			_.bindAll @
			window.appView = @
			@render()

			@model.get('pages').on 'add', @renderPage
			@model.on 'change:loading', @onLoading


			@myWall = @;
			#@$el.scrollTop(100) #use this when the pages are removed

		render:()->
			attr = @model.attributes
			@$el.html template attr
			@$content = @$el.find('#content');
			#console.log('masonry loaded');
			#@masonry = new Masonry( @$content[0] , { columnWidth:1, isFitWidth: true } );

		onLoading:->

			if @model.get 'loading'
				@$el.addClass 'loading' 
			else
				@$el.removeClass 'loading' 


		renderPage:(page)->
			console.log(@masonry);
			pageView = new PageView
				model : page
				collection : page.collection
				$wall : @$content
				#masonry : @masonry


			@$content.append(pageView.$el);




