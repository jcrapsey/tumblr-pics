define [
  'vendors/lodash'
  'vendors/backbone'
], (_, Backbone)->

  window.GLOBAL = GLOBAL =
    scroll_pos: 0
    post_limit: 20 #max of 20
    posts: 0
    post_offset: 0
    max_photo_width: 250
    

  _.extend(GLOBAL, Backbone.Events);

  #global events
  $window = $ window
  $html = $ 'html'

  onScroll = _.bind GLOBAL.trigger, GLOBAL, 'scroll'
  onScroll = _.debounce onScroll, 100
  $window.on 'scroll', onScroll

  onResize = _.bind GLOBAL.trigger, GLOBAL, 'resize'
  onResize = _.debounce onResize, 200
  $window.on 'resize', onResize

  GLOBAL.on 'scroll', ($e)->

    bottom = $html[0].scrollHeight - window.innerHeight * 2
    
    if bottom <= window.scrollY && window.scrollY > GLOBAL.scroll_pos
        GLOBAL.trigger 'scrollBottom', $e

    if 0 >= window.scrollY && window.scrollY < GLOBAL.scroll_pos
        GLOBAL.trigger 'scrollTop', $e

    GLOBAL.cur_scroll_pos = window.scrollY

  return GLOBAL
