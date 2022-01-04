DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (

    id INT NOT NULL AUTO_INCREMENT,

    name VARCHAR(30) NULL,

    PRIMARY KEY (id)
);

CREATE TABLE roles (

    id INT AUTO_INCREMENT,

    title VARCHAR(30) NULL,

    salary INT NULL,

    department_id INT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (

    id INT AUTO_INCREMENT,

    first_name VARCHAR(30) NULL,

    last_name VARCHAR(30) NULL,

    role_id INT NULL,

    manager_id INT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (role_id) REFERENCES roles(id),

    FOREIGN KEY (manager_id) REFERENCES employee(id)

);