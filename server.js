// const { Department } = require('./lib/departments');
// let mysql  = require('mysql');
// let config = require('./config/config');
// let connection = mysql.createConnection(config);

// async function main1() {
//   try {
//     // Fetch all Departments
//     //const sqlInput = new Department().viewAllDepartments;
//     const sqlInput = `SELECT * FROM department`;
//     const result = connection.query(sqlInput);
//     console.log(result);
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// }

// main1();
// index.js (or your main entry file)

const DataClass = require('./lib/departments');

// MySQL configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '9gnF97ChpvHVk@@JYipb',
    database: 'bankcompany_db'
};

const dataInstance = new DataClass(dbConfig);

// Example of fetching data
dataInstance.fetchData()
  .then((data) => {
    console.log(data);
    // Use the fetched data here as per your requirement
  })
  .catch((err) => {
    console.error(err);
  });
