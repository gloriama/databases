DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT
);

CREATE TABLE rooms (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name TEXT
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INTEGER,
  text TEXT,
  room_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(room_id) REFERENCES rooms(id),
  created_at DATETIME
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

