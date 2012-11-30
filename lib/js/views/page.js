var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'components/handlebars', 'views/post', 'components/masonry', 'text!templates/page.html'], function(_, Backbone, Handlebars, PostView, Masonry, page_html) {
  var PageView, template;
  template = Handlebars.compile(page_html);
  return PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.tagName = 'section';

    PageView.prototype.className = 'page';

    PageView.prototype.initialize = function(payload) {
      _.bindAll(this);
      this.model.on('change:posts', this.onPostsChange);
      return this.render();
    };

    PageView.prototype.render = function() {
      var attr;
      attr = this.model.attributes;
      return this.$el.html(template(attr));
    };

    PageView.prototype.refreshLayout = function() {
      if (this.masonry) {
        return this.masonry.reload();
      } else {
        this.masonry = new Masonry(this.el, {
          isFitWidth: true
        });
        return this.$el.addClass('animate');
      }
    };

    PageView.prototype.onPostsChange = function() {
      this.model.get('posts').each(this.renderPost);
      return this.refreshLayout();
    };

    PageView.prototype.renderPost = function(post) {
      var postView;
      postView = new PostView({
        model: post,
        collection: post.collection
      });
      return this.$el.append(postView.$el);
    };

    return PageView;

  })(Backbone.View);
});
