define [
	'components/jquery'
],($)->

	###
	jQuery Layout Plugin
	Author : Jeremy Crapsey

	###

	#globals
	_cols = 1
	_$elms = null
	_len = 0
	_max_height = 0
	_offset = 0

	calculateX = (index,width)->
		return Math.floor((index % _cols ) * (width + (_offset*2))) 

	calculateY = (index)->

		elm = _$elms[(index-_cols)]
		if elm
			y =($.data(elm,"y") + $.data(elm,"height"))+_offset
		else
			y = 0

		return y

	positionElm = (index,elm)->

		width = $.data(elm,"width") or $(elm).outerWidth()
		height = $.data(elm,"height") or $(elm).outerHeight()

		x = calculateX(index,width)+(_offset)
		y = calculateY(index)+(_offset)

		$.data(elm,"height",height)
		$.data(elm,"width",width)
		$.data(elm,"y",y)

		$elm = _$elms.eq(index)

		$elm.css("-webkit-transform","translate3d("+x+"px, "+y+"px, -1px)");
		$elm.css("-moz-transform","translate3d("+x+"px, "+y+"px, -1px)");

		###
		$elm.css("left",x);
		$elm.css("top",y);
		###
		
		from_top = (y + height)

		if index >= (_len - _cols) and from_top > _max_height
			_max_height = (y + height)+(_offset)


	$.extend $.fn,
		layout : ( selector, windowWidth, offset )->
			_$elms = @find selector
			_offset = offset

			return @ if _$elms.length <= 0

			width = ($.data(_$elms[0],"width") or $(_$elms[0]).outerWidth()) + (_offset*2)
			_len = _$elms.length
			_cols = Math.floor(windowWidth/width) || 1

			_$elms.each positionElm
			@.css('height',_max_height)
			@.css('width',width*_cols)

			#reset
			_$elms = null
			_max_height = 0
			_len = 0
			_offset = 0

			return @



