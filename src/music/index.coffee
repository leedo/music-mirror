sqlite = require "sqlite3"

module.exports = class Index
  constructor: (@dbfile) ->
    exists = path.existsSync @dbfile
    @db = new sqlite.Database @dbfile
    @create() unless exists

  addfile: (hash, meta, album) ->
    @db.run "INSERT INTO file (file_hash, file_album) VALUES(?,?)", hash, album, ->
      if meta
        @setmeta(this.lastID, k, v) for k,v of meta

  setmeta: (file, field, value) ->
    @db.run "INSERT INTO meta (meta_file, meta_field, meta_value)
             VALUES(?,?,?)", file, field, value

  clearmeta: (file) ->
    @db.run "DELETE FROM meta WHERE meta_id=?", file

  create: ->
    @db.run "CREATE TABLE file (
      file_id INT PRIMARY KEY,
      file_hash TEXT UNIQUE,
      file_album INT)"

    @db.run "CREATE TABLE meta (
      meta_id INT PRIMARY KEY,
      meta_file INT,
      meta_field TEXT,
      meta_value TEXT)"

    @db.run "CREATE TABLE artist (
      artist_id INT PRIMARY KEY,
      artist_name TEXT)"

    @db.run "CREATE TABLE album (
      album_id INT PRIMARY KEY,
      album_artist_id INT,
      album_title TEXT,
      album_year INT)"
