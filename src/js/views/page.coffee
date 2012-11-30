define [
	'components/underscore'
	'components/backbone'
	'components/handlebars'
	'views/post'
	'components/masonry'
	'text!templates/page.html'
],(_,Backbone,Handlebars,PostView,Masonry,page_html)->

	template = Handlebars.compile page_html

	class PageView extends Backbone.View
		tagName: 'section'
		className: 'page'

		initialize:(payload)->
			_.bindAll @
			@model.on 'change:posts', @onPostsChange

			@render();

		render:()->
			attr = @model.attributes
			@$el.html template attr

		refreshLayout : ()->
			if @masonry
				@masonry.reload();
			else
				@masonry = new Masonry( @el , { isFitWidth: true } );
				@$el.addClass('animate');

		onPostsChange:->
			@model.get('posts').each @renderPost
			@refreshLayout();

		renderPost:(post)->
			postView = new PostView
				model: post
				collection: post.collection

			@$el.append(postView.$el)
