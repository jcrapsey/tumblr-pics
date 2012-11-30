var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'components/handlebars', 'config', 'text!templates/post.html'], function(_, Backbone, Handlebars, c, post_html) {
  var PostView, template;
  template = Handlebars.compile(post_html);
  return PostView = (function(_super) {

    __extends(PostView, _super);

    function PostView() {
      return PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.tagName = 'article';

    PostView.prototype.className = 'post loading box col1';

    PostView.prototype.initialize = function() {
      var attr;
      attr = this.model.attributes;
      _.bindAll(this);
      this.$image = $(document.createElement('img'));
      this.$image.attr('src', attr.image.url);
      this.$image.load(this.onImageLoad);
      this.$image.error(this.onImageError);
      return this.render();
    };

    PostView.prototype.render = function() {
      var $photo, attr;
      attr = this.model.attributes;
      this.$el.html(template(attr));
      $photo = this.$el.find('.photo');
      $photo.css({
        width: attr.image.width,
        height: attr.image.height
      });
      return $photo.append(this.$image);
    };

    PostView.prototype.onImageLoad = function() {
      return this.$el.removeClass('loading');
    };

    PostView.prototype.onImageError = function() {
      return this.$el.addClass('error');
    };

    return PostView;

  })(Backbone.View);
});
