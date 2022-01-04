const connection = require("./connection");


class QUERY {
  constructor(connection) {
    this.connection = connection;
  }

  
  findEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS Department, role.salary from role LEFT JOIN department ON role.department_id=department.id;"
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
    return this.connection.promise().query("Insert into role SET ?", newRole);
  }
  addEmployee(newEmployee) {
    console.log("hit the function!");
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", newEmployee);
  }
  updateEmployee() {
    return this.connection.promise().query("");
  }
}

module.exports = new QUERY(connection);