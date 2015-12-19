var models = require('../models');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages
      console.log("received get request to /classes/messages");
      models.messages.get(function(err, results, fields) {
        res.writeHead(200, {});
        res.end(JSON.stringify({results: results}));
      });
      // models.messages.get(function(err, results, fields) {
      //   console.log("err", err);
      //   console.log("results", results);
      // });
    },
    post: function (req, res) { // a function which handles posting a message to the database
      //post(req.message);
      //send back a response saying "we added it, thanks"

      res.writeHead(200, headers);
      res.end();
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {}, //last priority since never used
    post: function (req, res) {}
  }
};