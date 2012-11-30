
require.config({
  baseUrl: './',
  paths: {
    'components/backbone': 'components/backbone/index',
    'components/jquery': 'components/jquery/index',
    'components/underscore': 'components/underscore/index',
    'components/handlebars': 'components/handlebars/index',
    'components/masonry': 'components/masonry/index',
    'collections': 'js/collections',
    'models': 'js/models',
    'templates': 'js/templates',
    'views': 'js/views',
    'config': 'js/config',
    'router': 'js/router',
    'text': 'components/requirejs-text/index'
  },
  shim: {
    'components/backbone': {
      deps: ['components/jquery', 'components/underscore'],
      exports: 'Backbone'
    },
    'components/jquery': {
      exports: 'jQuery'
    },
    'components/underscore': {
      exports: '_'
    },
    'components/masonry': {
      exports: 'Masonry'
    },
    'components/handlebars': {
      exports: 'Handlebars'
    }
  }
});

require(['components/underscore', 'components/backbone', 'config'], function(_, Backbone, c) {
  var sync, _modelSet;
  _modelSet = Backbone.Model.prototype.set;
  _.extend(Backbone.Model.prototype, {
    toJSON: function(options) {
      var attr, key, _cache, _ref;
      _cache = {};
      _ref = this.attributes;
      for (key in _ref) {
        attr = _ref[key];
        if ((attr instanceof Backbone.Model) || (attr instanceof Backbone.Collection)) {
          _cache[key] = attr.toJSON();
        } else {
          _cache[key] = _.clone(attr);
        }
      }
      return _cache;
    },
    set: function(key, value, options) {
      var myObj;
      if (this.preprocess) {
        if (_.isObject(key)) {
          this.preprocess(key);
        } else if (_.isString(key)) {
          myObj = {};
          myObj[key] = value;
          this.preprocess(myObj);
          value = myObj[key];
        }
      }
      return _modelSet.call(this, key, value, options);
    }
  });
  sync = Backbone.sync;
  return Backbone.sync = function(method, model, options) {
    var data;
    options.timeout = 10000;
    options.dataType = "jsonp";
    options.jsonp = "jsonp";
    options.data = options.data || {};
    options.data.api_key = c.API_KEY;
    options.url = "http://api.tumblr.com/v2/blog/" + c.DOMAIN + model.url;
    data = localStorage.getItem('page:' + options.data.offset);
    if (data) {
      return options.success(JSON.parse(data), "success");
    } else {
      return sync(method, model, options);
    }
  };
});

require(['components/underscore', 'components/backbone', 'components/jquery', 'config', 'router'], function(_, Backbone, $, c, Router) {
  var $html, router, _at_bottom, _at_top, _resize_payload, _resize_timeout, _resize_trigger;
  window.global = _.extend({}, Backbone.Events);
  window.global.data = {};
  _resize_payload = {};
  _resize_trigger = function() {
    _resize_payload.cols = Math.floor(window.innerWidth / c.CELL_WIDTH) || 1;
    window.global.data.cols = _resize_payload.cols;
    return global.trigger('windowresize', window.global.data);
  };
  _resize_timeout = null;
  $(window).on('resize', function(e) {
    if (_resize_timeout) {
      clearTimeout(_resize_timeout);
    }
    return _resize_timeout = setTimeout(_resize_trigger, 200);
  });
  _at_bottom = false;
  _at_top = false;
  $html = $('html');
  $(window).on('scroll', function(e) {
    var bottom;
    global.trigger('scroll', e);
    bottom = $html[0].scrollHeight - window.innerHeight - 250;
    if (bottom <= window.scrollY) {
      if (!_at_bottom) {
        _at_bottom = true;
        global.trigger('pagebottom', e);
      }
    } else {
      _at_bottom = false;
    }
    if (0 >= window.scrollY) {
      if (!_at_top) {
        _at_top = true;
        return global.trigger('pagetop', e);
      }
    } else {
      return _at_top = false;
    }
  });
  router = new Router();
  return Backbone.history.start({
    pushState: false
  });
});
