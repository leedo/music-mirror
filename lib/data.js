(function() {
  var Data, Upload, crypto, fd, process;
  fd = require("fd");
  process = require("process");
  crypto = require("crypto");
  Data = (function() {
    function Data(dir) {
      var stats;
      this.dir = dir;
      stats = fs.statSync(this.dir);
      if (!stats.isDirectory) {
        throw "" + this.dir + " is not a directory";
      }
    }
    Data.prototype.get = function(hash, cb) {
      var path;
      path = hash.substr(0, 2).split("").join("/") + hash;
      return fs.open("" + this.dir + "/" + path, 'r', cb);
    };
    Data.prototype.new_upload = function() {
      return new Upload(this.dir);
    };
    return Data;
  })();
  Upload = (function() {
    function Upload(dir) {
      this.dir = dir;
      this.shasum = crypto.createHash("sha1");
      this.path = "uploads/" + process.pid + "-upload-" + ((new Date()).getTime());
      this.stream = fs.createWriteStream(this.path);
    }
    Upload.prototype.append = function(chunk) {
      this.shasum.update(chunk);
      return this.stream.write(chunk);
    };
    Upload.prototype.end = function() {
      var hash;
      this.stream.end();
      hash = this.shasum.digest("hex");
      return fs.rename(this.path, "" + this.dir + "/" + hash);
    };
    return Upload;
  })();
}).call(this);
