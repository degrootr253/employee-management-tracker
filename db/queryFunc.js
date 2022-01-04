const connection = require("../config/connection");


class QUERY {
  constructor(connection) {
    this.connection = connection;
  }


  findEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT roles.id, roles.title, department.name AS department, roles.salary from roles LEFT JOIN department ON roles.department_id=department.id;"
      );
  }
  findDepartments() {
    return this.connection
      .promise()
      .query(
        "SELECT department.id, department.name AS Department FROM department;"
      );
  }
  addDepartment(addDept) {
    console.log("hit the function!");
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", addDept);
  }
  addRole(newRole) {
    console.log("hit the function!");
    return this.connection.promise().query("Insert into roles SET ?", newRole);
  }
  addEmployee(newEmployee) {
    console.log("hit the function!");
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", newEmployee);
  }
  updateEmployee(updateEmployee) {
    return this.connection.promise().query("UPDATE employee SET ? WHERE ?",updateEmployee);
  }
}

module.exports = new QUERY(connection);