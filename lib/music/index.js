(function() {
  var Index, sqlite;
  sqlite = require("sqlite3");
  module.exports = Index = (function() {
    function Index(dbfile) {
      var exists;
      this.dbfile = dbfile;
      exists = path.existsSync(this.dbfile);
      this.db = new sqlite.Database(this.dbfile);
      if (!exists) {
        this.create();
      }
    }
    Index.prototype.addfile = function(hash, meta, album) {
      return this.db.run("INSERT INTO file (file_hash, file_album) VALUES(?,?)", hash, album, function() {
        var k, v, _results;
        if (meta) {
          _results = [];
          for (k in meta) {
            v = meta[k];
            _results.push(this.setmeta(this.lastID, k, v));
          }
          return _results;
        }
      });
    };
    Index.prototype.setmeta = function(file, field, value) {
      return this.db.run("INSERT INTO meta (meta_file, meta_field, meta_value)             VALUES(?,?,?)", file, field, value);
    };
    Index.prototype.clearmeta = function(file) {
      return this.db.run("DELETE FROM meta WHERE meta_id=?", file);
    };
    Index.prototype.create = function() {
      this.db.run("CREATE TABLE file (      file_id INT PRIMARY KEY,      file_hash TEXT UNIQUE,      file_album INT)");
      this.db.run("CREATE TABLE meta (      meta_id INT PRIMARY KEY,      meta_file INT,      meta_field TEXT,      meta_value TEXT)");
      this.db.run("CREATE TABLE artist (      artist_id INT PRIMARY KEY,      artist_name TEXT)");
      return this.db.run("CREATE TABLE album (      album_id INT PRIMARY KEY,      album_artist_id INT,      album_title TEXT,      album_year INT)");
    };
    return Index;
  })();
}).call(this);
