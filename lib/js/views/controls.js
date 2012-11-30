var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'components/handlebars', 'text!templates/controls.html'], function(_, Backbone, Handlebars, controls_html) {
  var PageView, template;
  template = Handlebars.compile(controls_html);
  return PageView = (function(_super) {

    __extends(PageView, _super);

    function PageView() {
      return PageView.__super__.constructor.apply(this, arguments);
    }

    PageView.prototype.events = {
      "keydown :input": "onKeydown",
      "touchend .top": "scrollToTop",
      "touchend .submit": "tumbl"
    };

    PageView.prototype.initialize = function() {
      _.bindAll(this);
      return this.render();
    };

    PageView.prototype.render = function() {
      var attr;
      attr = this.model.attributes;
      this.$el.html(template(attr));
      return this.$input = this.$el.find('input');
    };

    PageView.prototype.scrollToTop = function(e) {
      console.log('scroll to top');
      e.preventDefault();
      return window.scrollTo(0, 0);
    };

    PageView.prototype.tumbl = function(e) {
      var address;
      console.log('tumbl');
      e.preventDefault();
      address = this.$input.val();
      if (this.model.get('url') !== address) {
        return this.model.set('url', address);
      }
    };

    PageView.prototype.onKeydown = function(e) {
      console.log(e.which);
      if (e.which === 13) {
        e.preventDefault();
        return this.tumbl(e);
      }
    };

    return PageView;

  })(Backbone.View);
});
