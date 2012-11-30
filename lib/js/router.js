
define(['components/underscore', 'components/backbone', 'views/app', 'views/controls', 'views/wall', 'models/wall', 'models/controls', 'config'], function(_, Backbone, AppView, ControlsView, WallView, Wall, Controls, config) {
  return Backbone.Router.extend({
    initialize: function() {
      var appView;
      appView = new AppView();
      _.bindAll(this);
      $('body').html(appView.el);
      this.$controlsContainer = appView.$el.find('#controls')[0];
      this.$wallContainer = appView.$el.find('#wall')[0];
      this.controlsView = new ControlsView({
        el: this.$controlsContainer,
        model: new Controls
      });
      return this.controlsView.model.on('change:url', this.onChangeUrl);
    },
    onChangeUrl: function(model) {
      var url;
      url = model.get('url');
      console.log('url changed!', url);
      return this.navigate("/" + url, {
        trigger: true,
        replace: true
      });
    },
    routes: {
      "http://:url": "site",
      "http://:url/": "site",
      ":url": "site"
    },
    site: function(tumblr) {
      var i, wallView, _i;
      console.log('site function was triggered', tumblr);
      config.DOMAIN = tumblr + '.tumblr.com';
      wallView = new WallView({
        model: new Wall,
        el: this.$wallContainer
      });
      this.controlsView.$input.val(tumblr);
      for (i = _i = 0; _i < 1; i = ++_i) {
        wallView.model.loadPage(i);
      }
      global.on('pagebottom', function(e) {
        return wallView.model.loadPage();
      });
      global.on('pagetop', function(e) {});
      return global.on('windowresize', function() {
        wallView.model.set;
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      });
    }
  });
});
