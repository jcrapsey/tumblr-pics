require.config
	baseUrl :'./'
	paths :
		'components/backbone': 'components/backbone/index'
		'components/jquery': 'components/jquery/index'
		'components/underscore': 'components/underscore/index'
		'components/handlebars': 'components/handlebars/index'
		'components/masonry': 'components/masonry/index'

		'collections':'js/collections'
		'models'     :'js/models'
		'templates'  :'js/templates'
		'views'      :'js/views'
		'config'     :'js/config'
		'router'     :'js/router'

		#requirejs plugins
		'text': 'components/requirejs-text/index'
	shim:
		'components/backbone': 
			deps: ['components/jquery','components/underscore']
			exports: 'Backbone'

		'components/jquery':
			exports: 'jQuery'
				
		'components/underscore':
			exports:'_'

		'components/masonry':
			exports:'Masonry'

		'components/handlebars':
			exports:'Handlebars'

require [
	'components/underscore'
	'components/backbone'
	'config'
],(_,Backbone,c)->

	_modelSet = Backbone.Model.prototype.set
	_.extend Backbone.Model.prototype,
		#Backbone.toJSON
		#Used for storing multi dimensional data
		toJSON : (options)->
			_cache = {}
			for key, attr of @attributes

				if (attr instanceof Backbone.Model) or (attr instanceof Backbone.Collection)
					_cache[key] = attr.toJSON()
				else
					_cache[key] = _.clone(attr)

			return _cache

		#Set override to add a preprocessor 
		set : (key, value, options)->

			if @preprocess
				if _.isObject key
					@preprocess(key)
				else if _.isString key
					myObj = {}
					myObj[key] = value
					@preprocess(myObj)
					value = myObj[key]

			_modelSet.call @, key, value, options


				

	#Backbone.sync
	sync = Backbone.sync
	Backbone.sync = (method, model, options)->
		#Customized jQuery AJAX options
		options.timeout = 10000;
		options.dataType = "jsonp";
		options.jsonp = "jsonp";
		options.data = options.data || {};
		options.data.api_key = c.API_KEY;

		#Setup the Rest API Url
		options.url = "http://api.tumblr.com/v2/blog/"+c.DOMAIN + model.url

		data = localStorage.getItem('page:'+options.data.offset)

		if(data)
			options.success JSON.parse(data), "success"
		else
			return sync method, model, options


require [
	'components/underscore'
	'components/backbone'
	'components/jquery'
	'config'
	'router'
],(_,Backbone,$,c,Router)->

	# Global Page Events
	window.global = _.extend({}, Backbone.Events);
	window.global.data = {}

	#Detect Resize "intents" rather than "events"
	_resize_payload = {}
	_resize_trigger = ->
		_resize_payload.cols = Math.floor(window.innerWidth/c.CELL_WIDTH) || 1
		window.global.data.cols = _resize_payload.cols
		global.trigger 'windowresize',window.global.data

	_resize_timeout = null

	$(window).on 'resize', (e)->
		clearTimeout _resize_timeout if _resize_timeout
		_resize_timeout = setTimeout _resize_trigger, 200

	#Detect Scroll "intents" rather than "events"
	_at_bottom = false
	_at_top = false

	$html = $('html')

	$(window).on 'scroll', (e)->

		global.trigger 'scroll',e

		bottom = $html[0].scrollHeight-window.innerHeight-250

		if bottom <= window.scrollY

			if not _at_bottom
				_at_bottom = true
				global.trigger 'pagebottom',e

		else
			_at_bottom = false

		if 0 >= window.scrollY

			if not _at_top
				_at_top = true
				global.trigger 'pagetop',e

		else
			_at_top = false

	router = new Router();
	Backbone.history.start({pushState: false});
	


