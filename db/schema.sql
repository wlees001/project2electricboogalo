-- Drops the playte if it exists currently --
DROP DATABASE IF EXISTS playte_db;
-- Creates the "playte" database --
CREATE DATABASE playte_db;


CREATE TABLE Playlist 
(
    id text NOT NULL,
    name text NOT NULL
);


CREATE TABLE Search
(
    id  INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    links  VARCHAR(255)  NOT NULL
);