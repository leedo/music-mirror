(function() {
  var Upload, crypto, fs, process;
  fs = require("fs");
  process = require("process");
  crypto = require("crypto");
  module.exports = Upload = (function() {
    function Upload(dir) {
      this.dir = dir;
      this.shasum = crypto.createHash("sha1");
      this.path = [this.dir, "tmp", process.pid, "-upload-", (new Date()).getTime()].join("/");
      this.stream = fs.createWriteStream(this.path);
    }
    Upload.prototype.append = function(chunk) {
      this.shasum.update(chunk);
      return this.stream.write(chunk);
    };
    Upload.prototype.end = function(cb) {
      var dir, hash;
      this.stream.end();
      hash = this.shasum.digest("hex");
      dir = [this.dir, "data", hash.substr(0, 2).split("")].join("/");
      return fs.mkdir(dir, function() {
        var path;
        path = [dir, hash].join("/");
        return fs.rename(this.path, path, function() {
          return cb(path);
        });
      });
    };
    return Upload;
  })();
}).call(this);
