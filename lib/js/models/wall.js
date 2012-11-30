var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['components/underscore', 'components/backbone', 'config', 'collections/pages', 'models/Page'], function(_, Backbone, c, Pages, Page) {
  var App;
  return App = (function(_super) {

    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.defaults = {
      page_count: -1,
      loading: false
    };

    App.prototype.initialize = function() {
      localStorage.clear();
      _.bindAll(this);
      this.set({
        topPages: new Pages
      });
      this.set({
        pages: new Pages
      });
      this.set({
        bottomPages: new Pages
      });
      return this.get('pages').on('add', this.onPageAdd);
    };

    App.prototype.loadPage = function(index) {
      var offset, page;
      if (typeof index === 'number') {
        offset = index * 20;
        this.attributes.page_count = index;
      } else {
        offset = (this.attributes.page_count += 1) * 20;
      }
      page = new Page;
      this.get('pages').add(page);
      this.set('loading', true);
      return page.fetch({
        add: false,
        data: {
          limit: 20,
          type: 'photo',
          offset: offset
        },
        success: this.onLoadSuccess,
        error: this.onLoadError
      });
    };

    App.prototype.onLoadSuccess = function() {
      return this.set('loading', false);
    };

    App.prototype.onLoadFailure = function() {
      return this.set('loading', false);
    };

    return App;

  })(Backbone.Model);
});
