sqlite = require "sqlite3"

class Index
  constructor: (@dbfile) ->
    exists = path.existsSync @dbfile
    @db = new sqlite.Database @dbfile
    @create() unless exists

  addfile: (hash, meta, album) ->
    @db.run "INSERT INTO file (hash,album) VALUES(?,?)", hash, album, ->
      if meta
        @setmeta(this.lastID, k, v) for k,v of meta

  setmeta: (file, field, value) ->
    @db.run "INSERT INTO meta (file,field,value) VALUES(?,?,?)", file, field, value

  clearmeta: (file) ->
    @db.run "DELETE FROM meta WHERE id=?", file

  create: ->
    @db.run "CREATE TABLE file (
      id INT PRIMARY KEY,
      hash TEXT UNIQUE,
      album INT)"

    @db.run "CREATE TABLE meta (
      id INT PRIMARY KEY,
      file INT,
      field TEXT,
      value TEXT)"

    @db.run "CREATE TABLE album (
      id INT PRIMARY KEY,
      title TEXT,
      artist TEXT,
      year INT)"
