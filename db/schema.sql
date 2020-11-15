### Schema

CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	rating INT(2) NOT NULL DEFAULT 99,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
