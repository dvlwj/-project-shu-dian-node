-- ***************
-- *** REQUIREMENTS
-- *** MYSQL v8
-- ***************

-- Will check if database exist, if not exist It's will run a query to
-- Create a database with name shu_dian_dev_db with charset UTF8 as a standard
-- utf8mb4 is MySQL version for utf8, because MYSQL's utf8 is a limited version of
-- a global standard version of utf8, which is will not support some character
-- like emoji unicode, some new modern unicode, etc
CREATE DATABASE IF NOT EXISTS shu_dian_dev_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- will select shu_dian_dev_db
USE shu_dian_dev_db;

-- Will check if table exist, if not exist It's will run a query to
-- Create a table with columns of id, subject, created_by, updated_by, updated_on
-- id will be the primary key
CREATE TABLE IF NOT EXISTS to_do_list (
  id int(11) NOT NULL AUTO_INCREMENT,
  subject varchar(50) NOT NULL,
  status ENUM('todo','done') NOT NULL DEFAULT 'todo',
  created_by varchar(50) NOT NULL,
  created_on DATETIME DEFAULT NOW(),
  updated_by varchar(50),
  updated_on DATE,
  active BOOLEAN NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
)