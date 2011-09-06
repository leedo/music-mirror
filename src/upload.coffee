fs      = require "fs"
process = require "process"
crypto  = require "crypto"

class Upload
  constructor: (@dir) ->
    @shasum = crypto.createHash "sha1"
    @path   = [@dir, "tmp", process.pid, "-upload-", (new Date()).getTime()].join("/")
    @stream = fs.createWriteStream @path

  append: (chunk) ->
    @shasum.update chunk
    @stream.write chunk

  end: (cb) ->
    @stream.end()
    hash = @shasum.digest "hex"
    dir = [@dir, "data", hash.substr(0,2).split("")].join("/")
    fs.mkdir dir, ->
      path = [dir, hash].join("/")
      fs.rename @path, path, ->
        cb(path)
