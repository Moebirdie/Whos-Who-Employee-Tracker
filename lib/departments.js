// Exports Department Functions
const mysql = require('mysql2/promise');
// const express = require('express');

const PORT = process.env.PORT || 3001;
//  const app = express();

//  // Express middleware
//  app.use(express.urlencoded({ extended: false }));
//  app.use(express.json());

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
const runTableQuery = async function runQuery(sql, params) {
  try {
    const [result] = await db.query(sql, params);
    console.table(result);
    return result;
  }
  catch (error) {
    throw error;
  }
}

const runMessageQuery = async function runQuery(sql, params, msg) {
  try {
    const [result] = await db.query(sql, params);
//    console.table(result);
    console.log(msg);
    return result;
  }
  catch (error) {
    throw error;
  }
}


class DepartmentClass {
  constructor(id, name, is_active) {
    this.id = id;
    this.name = name;
    this.is_active = is_active;
  };
  //view departments
  async viewAllDepartments() {
    const sql = 'SELECT id, name, is_active FROM department';
    console.log('hellodept');
    return runTableQuery(sql);
    };
  //insert department
  async createDepartment(name) {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const msg = "You've successfully added a department!";
    const params = [name];
    return runMessageQuery(sql, params, msg);
  }
  deleteDepartment() {

  };
  selectDepartments() {

  };
  updateDepartmentName() {

  };

};


(async () => {
  const departments = await new DepartmentClass().createDepartment('Billing');
})();

(async () => {
  const departments = await new DepartmentClass().viewAllDepartments();
})();




module.exports = DepartmentClass;



