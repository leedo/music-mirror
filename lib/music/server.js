(function() {
  var Data, Index, eco, express;
  express = require("express");
  eco = require("eco");
  Data = require("./storage.js");
  Index = require("./index.js");
  exports.run = function() {
    var app, data;
    app = express.createServer();
    app.register(".eco", eco);
    data = new Data("./data");
    app.get("/", function(req, res) {
      return res.render("index.eco");
    });
    app.post("/upload", function(req, res) {
      return res.send("huh");
    });
    return app.listen(5000);
  };
}).call(this);
