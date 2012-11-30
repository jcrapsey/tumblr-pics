define [
	'components/underscore'
	'components/backbone'
	'config'
	'collections/pages'
	'models/Page'
],(_,Backbone,c,Pages,Page)->

	class App extends Backbone.Model
		defaults:
			page_count:-1
			loading:false

		initialize: ->
			
			localStorage.clear()

			_.bindAll @
			@set {topPages : new Pages}
			@set {pages : new Pages}
			@set {bottomPages : new Pages}

			@get('pages').on 'add', @onPageAdd

		loadPage : (index)->
			if typeof index == 'number'
				offset = (index * 20)
				@attributes.page_count = index
			else
				offset = (@attributes.page_count += 1) * 20

			page = new Page
			@get('pages').add page

			@set 'loading', true
			page.fetch
				add: false
				data:
					limit: 20
					type: 'photo'
					offset: offset
				success:@onLoadSuccess
				error:@onLoadError

		onLoadSuccess:->
			@set 'loading', false
		onLoadFailure:->
			@set 'loading', false

