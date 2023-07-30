DROP DATABASE IF EXISTS bankcompany_db;
CREATE DATABASE bankcompany_db;

USE bankcompany_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL DEFAULT "null",
  is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL DEFAULT "null",
  salary DECIMAL NOT NULL DEFAULT 0,
  department INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  FOREIGN KEY (department) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL DEFAULT "null",
  last_name VARCHAR(30) NOT NULL DEFAULT "null",
  role_id INT NOT NULL DEFAULT 0,
  manager_id INT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);