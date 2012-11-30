var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'components/handlebars', 'views/page', 'text!templates/wall.html'], function(_, Backbone, Handlebars, PageView, wall_html) {
  var AppView, template;
  template = Handlebars.compile(wall_html);
  return AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.className = 'app-view';

    AppView.prototype.initialize = function() {
      _.bindAll(this);
      window.appView = this;
      this.render();
      this.model.get('pages').on('add', this.renderPage);
      this.model.on('change:loading', this.onLoading);
      return this.myWall = this;
    };

    AppView.prototype.render = function() {
      var attr;
      attr = this.model.attributes;
      this.$el.html(template(attr));
      return this.$content = this.$el.find('#content');
    };

    AppView.prototype.onLoading = function() {
      if (this.model.get('loading')) {
        return this.$el.addClass('loading');
      } else {
        return this.$el.removeClass('loading');
      }
    };

    AppView.prototype.renderPage = function(page) {
      var pageView;
      console.log(this.masonry);
      pageView = new PageView({
        model: page,
        collection: page.collection,
        $wall: this.$content
      });
      return this.$content.append(pageView.$el);
    };

    return AppView;

  })(Backbone.View);
});
