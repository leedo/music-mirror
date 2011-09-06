(function() {
  var Index, sqlite;
  sqlite = require("sqlite3");
  Index = (function() {
    function Index() {}
    constructor(function(dbfile) {
      var exists;
      this.dbfile = dbfile;
      exists = path.existsSync(this.dbfile);
      this.db = new sqlite.Database(this.dbfile);
      if (!exists) {
        return this.create();
      }
    });
    addfile(function(hash, meta, album) {
      return this.db.run("INSERT INTO file (hash,album) VALUES(?,?)", hash, album, function() {
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
    });
    setmeta(function(file, field, value) {
      return this.db.run("INSERT INTO meta (file,field,value) VALUES(?,?,?)", file, field, value);
    });
    clearmeta(function(file) {
      return this.db.run("DELETE FROM meta WHERE id=?", file);
    });
    create(function() {
      this.db.run("CREATE TABLE file (      id INT PRIMARY KEY,      hash TEXT UNIQUE,      album INT)");
      this.db.run("CREATE TABLE meta (      id INT PRIMARY KEY,      file INT,      field TEXT,      value TEXT)");
      return this.db.run("CREATE TABLE album (      id INT PRIMARY KEY,      title TEXT,      artist TEXT,      year INT)");
    });
    return Index;
  })();
}).call(this);
