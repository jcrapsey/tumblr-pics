var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'models/page'], function(_, Backbone, Page) {
  var Pages;
  return Pages = (function(_super) {

    __extends(Pages, _super);

    function Pages() {
      return Pages.__super__.constructor.apply(this, arguments);
    }

    Pages.prototype.model = Page;

    Pages.prototype.initialize = function() {
      _.bindAll(this);
      return window.myPages = this;
    };

    Pages.prototype.parse = function(data) {
      return data.response;
    };

    return Pages;

  })(Backbone.Collection);
});
