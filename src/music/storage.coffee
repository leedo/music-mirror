fs   = require "fs"
path = require "path"

module.exports = class Storage
  constructor: (@dir) ->
    for dir in [@dir, "#{dir}/tmp", "#{dir}/data"]
      fs.mkdirSync(dir, 0755) unless path.existsSync(dir)

  get: (hash, cb) ->
    path = [@dir, "data", hash.substr(0,2).split(""), hash].join("/")
    fs.open path, 'r', cb

  new_upload: ->
    new Upload(@dir)
