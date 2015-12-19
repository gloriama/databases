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
      console.log("received post request to /classes/messages");
      console.log(req.body);
      // var messageAsString = '';
      // req.on('data', function(chunk) {
      //   console.log('heard "data" from POST request');
      //   messageAsString += chunk;
      // });
      // req.on('end', function() {
      //   console.log('heard "end" from POST request');
      //   models.messages.post(JSON.parse(messageAsString), function(err) {
      //     res.writeHead(201, {});
      //     res.end();
      //   });
      // })
      req.body.createdAt = new Date();
      req.body.objectId = 100;
      models.messages.post(req.body, function(err) {
        res.writeHead(201, {});
        res.end();
      });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {}, //last priority since never used
    post: function (req, res) {
      models.users.post(req.body, function(err) {
        res.writeHead(201, {});
        res.end();
      });
    }
  }
};