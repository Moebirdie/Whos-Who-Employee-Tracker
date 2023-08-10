// Exports Department Functions
const mysql = require('mysql2/promise');
const {runTableQuery, runMessageQuery} = require('../helpers/runqueries');

class DepartmentClass {
  constructor(id, name, is_active) {
    this.id = id;
    this.name = name;
    this.is_active = is_active;
  };

  //Department Functions for Queries
  async viewAllDepartments() {
    const sql = 'SELECT id, name, is_active FROM department ORDER BY name';
    return runTableQuery(sql);
  };

  async createDepartment(name) {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const msg = "You've successfully added a department!";
    const params = [name];
    return runMessageQuery(sql, params, msg);
  };
  
  async deleteDepartment(id) {
    const sql = 'DELETE FROM department WHERE id = ?';
    const msg = "You've successfully deleted a department!";
    const params = [id];
    return runMessageQuery(sql, params, msg);
  };

  async updateDepartmentName(newName, id ) {
    const sql = 'UPDATE department SET name = ? WHERE id = ?';
    const msg = "You've successfully updated the department name!";
    const params = [newName, id];
    return runMessageQuery(sql, params, msg);
  };
};


//*****  used in testing functions within this file only. To test, uncomment and run this js file. *****

// // (async () => {
// //   const createdept = await new DepartmentClass().createDepartment('Billing');
// // })();

// // (async () => {
// //   const updatedDept = await new DepartmentClass().updateDepartmentName('New', 19);
// // })();

 //(async () => {
//  const departments = await new DepartmentClass().viewAllDepartments();
 //})();



module.exports = DepartmentClass;



