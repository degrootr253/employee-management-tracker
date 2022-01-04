const inquirer = require('inquirer');
const db = require("./db");
const { } = require("./db");
require("console.table");


const startQuestion = [
    {
        type: "list",
        name: "initial",
        message: "What would you like to do?",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update employee role",
            "Quit",
        ],
    },
];

function init() {
    inquirer.prompt(startQuestion).then((res) => {
        switch (res.initial) {
            case "View Employees":
                viewEmployees();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Update employee role":
                updateEmployee();
                break;

            default:
                process.exit();
        }
    });

};

function viewEmployees() {
    db.findEmployees()
        .then(([data]) => {
            console.table(data);

        })
        .then(() => {
            init();
        })
};

function viewDepartments() {
    db.findDepartments()
        .then(([data]) => {
            console.table(data);
        })
        .then(() => {
            init();
        });
}

function viewRoles() {
    db.findRoles()
        .then(([data]) => {
            console.table(data);
        })
        .then(() => {
            init();
        })
};