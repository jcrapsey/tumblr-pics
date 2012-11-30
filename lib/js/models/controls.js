var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone'], function(_, Backbone) {
  var Controls;
  return Controls = (function(_super) {

    __extends(Controls, _super);

    function Controls() {
      return Controls.__super__.constructor.apply(this, arguments);
    }

    Controls.prototype.defaults = {
      url: ""
    };

    Controls.prototype.initialize = function(data, options) {
      return _.bindAll(this);
    };

    Controls.prototype.preprocess = function(attrs) {
      if (attrs.url) {
        attrs.url = this.cleanUrl(attrs.url);
      }
      return attrs;
    };

    Controls.prototype.cleanUrl = function(url) {
      var url_matches;
      url_matches = url.match(/^(?:https?\:\/\/)?([a-zA-Z0-9]+)(?=\.tumblr\.com|$)/);
      if ((url_matches != null ? url_matches.length : void 0) > 0) {
        return url_matches.pop();
      }
      return "";
    };

    return Controls;

  })(Backbone.Model);
});
