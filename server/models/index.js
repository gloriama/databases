var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages
      db.query('SELECT ' +
        'users.name AS username, ' +
        'messages.text AS text, ' +
        'rooms.name AS roomname, ' +
        'messages.id AS objectId, ' +
        'messages.created_at AS createdAt ' +
      'FROM ' +
        'messages INNER JOIN ' +
        'users INNER JOIN ' +
        'rooms ' + 
      'ON ' +
        'messages.user_id = users.id AND ' +
        'messages.room_id = rooms.id', function(err, results, fields) {
          //console.log("err", err);
          //console.log("results", results);
          callback(err, results, fields);
        });

      // query db with 'SELECT * FROM messages '
      // need to account for foreign keys with user and roomname
      // return results

      // columns: users.name as username, messages.text as message, rooms.name as roomname, messages.id as objectID, messages.created_at as createdAt, 
    },
    post: function (messageObj, callback) { // a function which can be used to insert a message into the database
      //run sql "SELECT" queries that transforms those properties into sql values
        //grab the user_id for messageObj.username
        //grab the room_id for messageObj.roomname
      //insert into messages table with the ids we now know for it

      db.query('SELECT id from users where name ="' + messageObj.username + '"', function(err, results) {
        // check whether user exists in user table
        // if not, add to user table, pass in everything else as a callback
        console.log(err, results);
        var userId = results[0];
        db.query('SELECT id from rooms WHERE name ="' + messageObj.roomname + '"', function(err, results) {
          //if results.length is 0
          if (results.length === 0) {
            //db.query insert into rooms
            db.query('INSERT INTO rooms (name) VALUES (?)', [messageObj.roomname], function(err, results) {

            })
          }
          var helper = function() {
            var roomId = results[0];
            var dateTime = new Date();
            db.query('INSERT INTO messages (user_id, text, room_id, created_at) VALUES (?, ?, ?, ?)',
              [userId, messageObj.message, roomId, dateTime], function(err, results){
                if (err) {console.log('error inserting into table', err);} 
                else {
                  console.log('inserted into messages table');
                  callback(err);
                }
              });
          }
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userObj, callback) {
      db.query('INSERT INTO users (name) VALUES (?)', [userObj.username], function(err, results) {
        callback(err);
      });
    }
  }
};