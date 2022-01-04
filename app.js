const inquirer = require('inquirer');
const db = require("./db/queryFunc");
const {} = require('./db/queryFunc')
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

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
        ])
        .then((res) => {
            let firstname = res.first_name;
            let lastname = res.last_name;
            console.log(firstname);
            console.log(lastname);

            db.findRoles().then(([data]) => {
                const roles = data.map(({ id, title }) => ({
                    name: title,
                    value: id,
                }));

            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "roleId",
                        message: "What is the employee's role?",
                        choices: roles,
                    },
                ]) 
                .then((res) => {
                    let newEmpRoleId = res.roleId;
                    console.log(newEmpRoleId);
                    db.findEmployees().then(([data]) => {
                        console.log(data);
                        const newEmpManager = data.map (
                            ({ id, first_name, last_name}) => ({
                                name: first_name.concat(" ", last_name),
                                value: id,
                            })
                        );
                    console.log(newEmpManager);
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "managerOption",
                                message: "Who is this employee's manager?",
                                choices: newEmpManager,
                            },
                        ])
                        .then((Res) => {
                            let empManager = res.managerOption;
                            console.log(empManager);
                            const employee = {
                                first_name: firstname,
                                last_name: lastname,
                                role_id: newEmpRoleId,
                                manager_id: empManager,
                            };
                         db.addEmployee(employee);
                        })
                        .then(() => init());

                    });
                }) ;  
            });
        });
}

init();