var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'config'], function(_, Backbone, c) {
  var Post;
  return Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.initialize = function(data, collection) {
      return _.bindAll(this);
    };

    Post.prototype.processData = function() {
      var attr, height, image_sizes, width;
      attr = this.attributes;
      if (attr.image) {
        return;
      }
      image_sizes = _.filter(attr.photos[0].alt_sizes, this.filter_sizes);
      if (image_sizes.length > 0) {
        attr.image = image_sizes[0];
      } else {
        attr.image = attr.photos[0].alt_sizes[attr.photos[0].alt_sizes.length - 1];
      }
      attr.image.height = Math.floor((c.IMAGE_WIDTH / attr.image.width) * attr.image.height);
      attr.image.width = c.IMAGE_WIDTH;
      width = attr.image.width + (c.CELL_PADDING * 2) + (c.CELL_SPACING * 2);
      height = attr.image.height + (c.CELL_PADDING * 2) + (c.CELL_SPACING * 2);
      return this.set({
        width: width,
        height: height
      });
    };

    Post.prototype.filter_sizes = function(data) {
      if (data.width <= c.IMAGE_WIDTH) {
        return data;
      }
    };

    return Post;

  })(Backbone.Model);
});
