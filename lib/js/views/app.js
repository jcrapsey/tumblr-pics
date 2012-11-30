var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'components/handlebars', 'text!templates/app.html'], function(_, Backbone, Handlebars, app_html) {
  var PageView, template;
  template = Handlebars.compile(app_html);
  return PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.tagName = 'div';

    PageView.prototype.initialize = function() {
      _.bindAll(this);
      return this.render();
    };

    PageView.prototype.render = function() {
      var attr;
      attr = {};
      return this.$el.html(template(attr));
    };

    return PageView;

  })(Backbone.View);
});
