define [
	'components/underscore'
	'components/backbone'
	'views/app'
	'views/controls'
	'views/wall'
	'models/wall'
	'models/controls'
	'config'
],(_,Backbone,AppView,ControlsView,WallView,Wall,Controls,config)->

	Backbone.Router.extend

		initialize:->
			appView = new AppView()

			_.bindAll @

			$('body').html(appView.el);

			@$controlsContainer = appView.$el.find('#controls')[0]
			@$wallContainer = appView.$el.find('#wall')[0]

			@controlsView = new ControlsView({el:@$controlsContainer,model:new Controls})
			@controlsView.model.on 'change:url', @onChangeUrl


		onChangeUrl: (model)->

			url = model.get('url')
			console.log 'url changed!',url
			@navigate("/"+url, {trigger: true, replace: true});

		routes:
			"http://:url":"site"
			"http://:url/":"site"
			":url":"site"

		site:(tumblr)->

			console.log 'site function was triggered',tumblr

			config.DOMAIN = tumblr+'.tumblr.com';

			wallView = new WallView {model: new Wall, el: @$wallContainer}

			@controlsView.$input.val tumblr

			for i in [0...1]
				wallView.model.loadPage(i)
			
			global.on 'pagebottom', (e)->
				wallView.model.loadPage()

			global.on 'pagetop', (e)->

			global.on 'windowresize', ->
				wallView.model.set
				width:window.innerWidth
				height:window.innerHeight


