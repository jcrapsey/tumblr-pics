define [
	'components/underscore'
	'components/backbone'
],(_,Backbone)->

	class Controls extends Backbone.Model

		defaults:
			url : ""

		initialize:(data,options)->
			_.bindAll @

		preprocess:(attrs)->
			attrs.url = @cleanUrl(attrs.url) if attrs.url
			return attrs

		cleanUrl:(url)->
			url_matches = url.match(/^(?:https?\:\/\/)?([a-zA-Z0-9]+)(?=\.tumblr\.com|$)/)
			return url_matches.pop() if url_matches?.length > 0
			return ""