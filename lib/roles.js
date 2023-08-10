// Exports Department Functions
const mysql = require('mysql2/promise');
const {runTableQuery, runMessageQuery} = require('../helpers/runqueries');

class RoleClass {
  constructor(id, title, salary, department, is_active) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department = department;
    this.is_active = is_active;
  };

  //Roles Functions for Queries
  async viewAllRoles() {
    const sql = 'SELECT role.id, role.title, role.salary, role.department, dept.name AS dept_name, role.is_active FROM role LEFT JOIN department dept ON dept.id = role.department ORDER BY role.title';
    console.log('hellorole');
    return runTableQuery(sql);
    };

  async createRole(title, salary, department, isActive) {
    const sql = 'INSERT INTO role (title, salary, department, is_active) VALUES (?,?,?,?)';
    const msg = "You've successfully added a new role!";
    const params = [title, salary, department, isActive];
    return runMessageQuery(sql, params, msg);
  };
  
  async deleteRole(id) {
    const sql = 'DELETE FROM role WHERE id = ?';
    const msg = "You've successfully deleted a role!";
    const params = [id];
    return runMessageQuery(sql, params, msg);
  };

  async updateRoleName(name, id ) {
    const sql = 'UPDATE role SET name = ? WHERE id = ?';
    const msg = "You've successfully updated a role name!";
    const params = [name, id];
    return runMessageQuery(sql, params, msg);
  };

  async updateRoleSalary(salary, id ) {
    const sql = 'UPDATE role SET salary = ? WHERE id = ?';
    const msg = "You've successfully updated a salary!";
    const params = [salary,id];
    return runMessageQuery(sql, params, msg);
  };
};


//*****  used in testing functions within this file only. To test, uncomment and run this js file. ********

//  (async () => {
//   const roles = await new RoleClass().viewAllRoles();
//  })();




module.exports = RoleClass;



