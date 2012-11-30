var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'config', 'collections/posts'], function(_, Backbone, c, Posts) {
  var Page;
  return Page = (function(_super) {

    __extends(Page, _super);

    function Page() {
      return Page.__super__.constructor.apply(this, arguments);
    }

    Page.prototype.defaults = {
      width: 0,
      height: 0
    };

    Page.prototype.url = "/posts";

    Page.prototype.initialize = function(data, options) {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      _.bindAll(this);
      return this.set({
        offset: (_ref = (_ref1 = (_ref2 = (options != null ? (_ref3 = options.data) != null ? _ref3.offset : void 0 : void 0)) != null ? _ref2 : (data != null ? data.offset : void 0)) != null ? _ref1 : ((_ref4 = this.attributes) != null ? _ref4.offset : void 0)) != null ? _ref : -1
      });
    };

    Page.prototype.parse = function(response) {
      var data, posts;
      posts = new Posts;
      posts.add(response.response.posts, {
        silent: false
      });
      data = {
        offset: response.response.offset,
        posts: posts
      };
      return data;
    };

    return Page;

  })(Backbone.Model);
});
