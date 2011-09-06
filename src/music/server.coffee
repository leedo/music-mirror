express = require "express"
eco     = require "eco"

Data    = require "./storage.js"
Index   = require "./index.js"

exports.run = ->
  app = express.createServer()
  app.register ".eco", eco
  data = new Data("./data")

  app.get "/", (req, res) ->
    res.render "index.eco"

  app.post "/upload", (req, res) ->
    res.send "huh"

  app.listen 5000
