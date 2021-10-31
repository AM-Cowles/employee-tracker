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