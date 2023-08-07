const mysql = require('mysql2/promise');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createPool(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '9gnF97ChpvHVk@@JYipb',
    database: 'bankcompany_db'
  },
  console.log(`Connected to the bankcompany_db database.`)
);

// function to run SQL queries - take input params, connect to db, query db, return result
async function runQuery(sql, params) {
  try {
    const [result] = await db.query(sql, params);
    console.table(result);
    return result;
  }
  catch (error) {
    throw error;
  }
}

//use sql for the sequal commands and params for the parameters held within an array to define the variables for executing the table functions

//create new department 
async function createDepartment(name, isActive) {
  const sql = 'INSERT INTO department (name, is_active) VALUES (?,?)';
  const params = [name, isActive];
  return runQuery(sql, params);
}

//create a new role 
async function createRole(title, salary, department, isActive) {
  const sql = 'INSERT INTO role (title, salary, department, is_active VALUES (?,?,?,?)';
  const params = [title, salary, department, isActive];
  return runQuery(sql, params);
}

//create a new employee 
async function createEmployee(firstName, lastName, roleId, managerId, isActive) {
  const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id, is_active) VALUES (?, ?, ?, ?, ?)';
  const params = [firstName, lastName, roleId, managerId, isActive];
  return runQuery(sql, params);
}

//view all departments 
async function viewDepartments() {
  const sql = 'SELECT id, name, is_active FROM department';
  console.log('hellodept');
  return runQuery(sql);
}

//view all roles 
async function viewRoles() {
  const sql = 'SELECT id, title, salary, department, is_active FROM role';
  console.log('hellorole');
  return runQuery(sql);
}

//view all departments 
async function viewEmployees() {
  const sql = 'SELECT * FROM employee';
  console.log('helloemp');
  return runQuery(sql);
}
//viewDepartments();


//module.exports = { viewEmployees, viewRoles, viewDepartments, createEmployee, createDepartment, createRole };
module.exports = { db, runQuery }