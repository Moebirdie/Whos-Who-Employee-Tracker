const mysql = require('mysql2/promise'); 

const PORT = process.env.PORT || 3001;

//Connect to database
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

//function to run SQL queries - take input params, connect to db, query db, return result
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
    console.log(msg);
    return result;
  }
  catch (error) {
    throw error;
  }
}

const deptChoices = async () => {
  const departmentQuery = 'SELECT id AS value, name FROM department ORDER BY name ASC;';
  const departments = await db.query(departmentQuery);
  return departments[0];
}

const roleChoices = async () => {
  const roleQuery = 'SELECT id AS value, title AS name FROM role ORDER BY title ASC;';
  const roles = await db.query(roleQuery);
  return roles[0];
}

const mgrChoices = async () => {
  const managerQuery = 'SELECT DISTINCT emp.manager_id AS value, man.last_name AS name FROM employee emp LEFT JOIN employee man ON emp.manager_id = man.id ORDER BY man.last_name ASC;';
  const managers = await db.query(managerQuery);
  return managers[0];
}

const employeeChoices = async () => {
  const employeeQuery = 'SELECT id AS value, CONCAT(first_name, " ", last_name) AS name FROM employee ORDER BY last_name, first_name;';
  const employees = await db.query(employeeQuery);
  return employees[0];
}

module.exports = { runTableQuery, runMessageQuery, deptChoices, mgrChoices, roleChoices, employeeChoices }