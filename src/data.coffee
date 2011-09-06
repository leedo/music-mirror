fd      = require "fd"
process = require "process"
crypto  = require "crypto"

class Data
  constructor: (@dir) ->
    stats = fs.statSync @dir
    throw "#{@dir} is not a directory" unless stats.isDirectory

  get: (hash, cb) ->
    path = hash.substr(0,2).split("").join("/") + hash
    fs.open "#{@dir}/#{path}", 'r', cb

  new_upload: ->
    new Upload(@dir)

class Upload
  constructor: (@dir) ->
    @shasum = crypto.createHash "sha1"
    @path   = "uploads/#{process.pid}-upload-#{(new Date()).getTime()}"
    @stream = fs.createWriteStream @path

  append: (chunk) ->
    @shasum.update chunk
    @stream.write chunk

  end: ->
    @stream.end()
    hash = @shasum.digest "hex"
    fs.rename @path, "#{@dir}/#{hash}"
