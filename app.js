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
