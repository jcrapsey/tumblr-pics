
define(['components/jquery'], function($) {
  /*
  	jQuery Layout Plugin
  	Author : Jeremy Crapsey
  */

  var calculateX, calculateY, positionElm, _$elms, _cols, _len, _max_height, _offset;
  _cols = 1;
  _$elms = null;
  _len = 0;
  _max_height = 0;
  _offset = 0;
  calculateX = function(index, width) {
    return Math.floor((index % _cols) * (width + (_offset * 2)));
  };
  calculateY = function(index) {
    var elm, y;
    elm = _$elms[index - _cols];
    if (elm) {
      y = ($.data(elm, "y") + $.data(elm, "height")) + _offset;
    } else {
      y = 0;
    }
    return y;
  };
  positionElm = function(index, elm) {
    var $elm, from_top, height, width, x, y;
    width = $.data(elm, "width") || $(elm).outerWidth();
    height = $.data(elm, "height") || $(elm).outerHeight();
    x = calculateX(index, width) + _offset;
    y = calculateY(index) + _offset;
    $.data(elm, "height", height);
    $.data(elm, "width", width);
    $.data(elm, "y", y);
    $elm = _$elms.eq(index);
    $elm.css("-webkit-transform", "translate3d(" + x + "px, " + y + "px, -1px)");
    $elm.css("-moz-transform", "translate3d(" + x + "px, " + y + "px, -1px)");
    /*
    		$elm.css("left",x);
    		$elm.css("top",y);
    */

    from_top = y + height;
    if (index >= (_len - _cols) && from_top > _max_height) {
      return _max_height = (y + height) + _offset;
    }
  };
  return $.extend($.fn, {
    layout: function(selector, windowWidth, offset) {
      var width;
      _$elms = this.find(selector);
      _offset = offset;
      if (_$elms.length <= 0) {
        return this;
      }
      width = ($.data(_$elms[0], "width") || $(_$elms[0]).outerWidth()) + (_offset * 2);
      _len = _$elms.length;
      _cols = Math.floor(windowWidth / width) || 1;
      _$elms.each(positionElm);
      this.css('height', _max_height);
      this.css('width', width * _cols);
      _$elms = null;
      _max_height = 0;
      _len = 0;
      _offset = 0;
      return this;
    }
  });
});
