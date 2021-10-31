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
    