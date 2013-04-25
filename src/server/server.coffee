express     = require 'express'
http        = require 'http'
request     = require 'request'
querystring = require 'querystring'
_           = require 'lodash'

app = express()

api_domain = 'http://api.tumblr.com/v2'

default_options =
  qs:
    api_key: 'c80JaRsOUBjTuKU9Wt3DxS9iMVL1jbvyipW5btKqZcsCw4UCsF'

app.get '/api/blog/:domain/posts/photo', (req,res)->

  opts =
    url: api_domain + '/blog/' + req.params.domain + '/posts/photo'
    qs: {}

  _.assign opts.qs, default_options.qs, req.query

  req.pipe(request(opts)).pipe(res)


app.use express.static __dirname + '/../client/'


port = process.env.PORT || 8675;

console.log 'app started on port : ' + port
app.listen port