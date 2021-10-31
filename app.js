const path = require('path');
const fs = require('fs');
let mysql = require('mysql');
let inquirer = require("inquirer");
const connection = require('./database/connection');

connection.connect(function (err) {
if (err) throw err;
console.log(`connected as id ${connection.threadId}`);
init();
});

// welcome
function init() {
    console.log(`Welcome to the Employee Management System (EMS)`)
    wwyltd();
}
// what would you like to do?
function wwyltd() {
    inquirer.prompt([{
    type: "list",
    name: "doWhat",
    message: "What would you like to do?",
    choices: [
        {
        name: "View all Employees",
        value: "VIEW_EMPLOYEES"
        },
        {
        name: "View all Roles",
        value: "VIEW_ROLES"
        },
        {
        name: "View all Departments",
        value: "VIEW_DEPT"

        }, {
        name: "Add employee",
        value: "ADD_EMPLOYEE"
        },
        {
        name: "Update Employee",
        value: "UPDATE_EMP"
        },
        {
        name: "Add Role",
        value: "ADD_ROLE"
        },
        {
        name: "Add Department",
        value: "ADD_DEPT"
        }

    ]
}]).then(({ doWhat }) => {
    if (doWhat === "VIEW_EMPLOYEES") {
    viewEmployee()
    } else if (doWhat === "ADD_EMPLOYEE") {
    addEmployeeByPaul()
    } else if (doWhat === "ADD_ROLE") {
    addRoles();
    } else if (doWhat === "UPDATE_EMP") {
    updateEmployeeByPaul();
    }
    else if (doWhat === "ADD_DEPT") {
    addDepartment()
    }
    else if (doWhat === "VIEW_ROLES") {
    viewRoles()
    }
    else if (doWhat === "VIEW_DEPT") {
    viewDepartments()
    }
    else if (doWhat === "UPDATE_ROLE") {
    updateRole()
    }
})
}
// view employees
function viewDepartments() {
console.log("Selecting all departments...\n");
connection.query("SELECT id AS `ID`, department AS `Department` FROM departments", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    areYouFinished();

});
}
function viewRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT title AS `Title`, salary AS `Salary`, depId AS `Department Id` FROM roles", function (err, res) {
    if (err) throw err;
      // Log all results of the SELECT statement
    console.table(res);
    areYouFinished();

    });
}
function viewEmployee() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT firstName AS `First Name`, lastName AS `Last Name`, roleId AS `Role Id` FROM employees", function (err, res) {
    if (err) throw err;
      // Log all results of the SELECT statement
    console.table(res);
    areYouFinished();

    });
}
// add employee, department, role
function updateRole() {
    // we need to get the role data
    connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    const roles = res.map(element => {
        return element.id
    })
    inquirer
        .prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is their first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is their last name?"
        },
        // ask role question based on role data
        {
            name: "roleId",
            type: "list",
            message: "What is their role id?",
            choices: roles
        }

        ])
        .then(function (answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
            "INSERT INTO employees SET ?",
            answer,
            function (err) {
            if (err) throw err;
            console.log(`${answer.firstName} ${answer.lastName} was added successfully`);
            // re-prompt the user for if they want to bid or post
            areYouFinished();
            }
        );
        });
    })
}
