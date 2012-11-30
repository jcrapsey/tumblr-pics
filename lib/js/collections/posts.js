var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'models/post'], function(_, Backbone, Post) {
  var Posts;
  return Posts = (function(_super) {

    __extends(Posts, _super);

    function Posts() {
      return Posts.__super__.constructor.apply(this, arguments);
    }

    Posts.prototype.model = Post;

    Posts.prototype.initialize = function(posts) {
      _.bindAll(this);
      window.myPosts = this;
      return this.on('add', this.onAdd);
    };

    Posts.prototype.onAdd = function(post) {
      return post.processData();
    };

    return Posts;

  })(Backbone.Collection);
});
