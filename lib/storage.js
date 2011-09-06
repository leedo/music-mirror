(function() {
  var Storage, fs;
  fs = require("fs");
  Storage = (function() {
    function Storage(dir) {
      var _i, _len, _ref;
      this.dir = dir;
      _ref = [this.dir, "" + dir + "/tmp", "" + dir + "/data"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        dir = _ref[_i];
        if (!path.existsSync(dir)) {
          fs.mkdirSync(dir, 0755);
        }
      }
    }
    Storage.prototype.get = function(hash, cb) {
      var path;
      path = [this.dir, "data", hash.substr(0, 2).split(""), hash].join("/");
      return fs.open(path, 'r', cb);
    };
    Storage.prototype.new_upload = function() {
      return new Upload(this.dir);
    };
    return Storage;
  })();
}).call(this);
