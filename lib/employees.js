// Exports Department Functions
const mysql = require('mysql2/promise');
const {runTableQuery, runMessageQuery} = require('../helpers/runqueries');


class EmployeeClass {
  constructor(id, first_name, last_name, role_id, manager_id, is_active) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.role_id = role_id;
    this.manager_id = manager_id;
    this.is_active = is_active;
  };

  //Employee Functions for Queries
  async viewAllEmployees() {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, role.salary, emp.manager_id, CONCAT(man.first_name," ", man.last_name) AS manager_name, dept.id AS dept_id, dept.name AS dept_name FROM employee emp LEFT JOIN role ON role_id = role.id LEFT JOIN department dept ON role.department = dept.id LEFT JOIN employee man ON emp.manager_id = man.id ORDER BY emp.last_name, emp.first_name ';
    console.log('helloemployee');
    return runTableQuery(sql);
    };

  async createEmployee(firstName, lastName, roleId, managerId, isActive) {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id, is_active) VALUES (?,?,?,?,?)';
    const msg = "You've successfully added an employee!";
    const params = [firstName, lastName, roleId, managerId, isActive];
    return runMessageQuery(sql, params, msg);
  };
  
  async deleteEmployee(id) {
    const sql = 'DELETE FROM employee WHERE id = ?';
    const msg = "You've successfully deleted an employee!";
    const params = [id];
    return runMessageQuery(sql, params, msg);
  };

  async updateManagerId(managerId, id ) {
    const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    const msg = "You've successfully updated the manager!";
    const params = [managerId,id];
    return runMessageQuery(sql, params, msg);
  };

  async updateRoleId(roleId, id ) {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const msg = "You've successfully updated the role!";
    const params = [roleId,id];
    return runMessageQuery(sql, params, msg);
  };

  async viewAllEmployeesByManager() {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, emp.is_active, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name FROM employee emp LEFT JOIN employee man ON emp.manager_id = man.id LEFT JOIN role on emp.role_id = role.id ORDER BY emp.manager_id, emp.last_name, emp.first_name';
    return runTableQuery(sql);
    };

  async viewAllEmpByDept() {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name, dept.id AS dept_id, dept.name AS dept_name FROM employee emp LEFT JOIN role ON role_id = role.id LEFT JOIN department dept ON role.department = dept.id LEFT JOIN employee man ON emp.manager_id = man.id GROUP BY emp.id, dept.name ORDER BY dept.name, emp.last_name, emp.first_name ';
    return runTableQuery(sql);
    };  

  async viewEmployeeByManagerId(managerId) {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name FROM employee emp LEFT JOIN employee man ON emp.manager_id = man.id LEFT JOIN role ON role_id = role.id WHERE emp.manager_id = ? ORDER BY emp.last_name, emp.first_name';
    const params = [managerId];
    return runTableQuery(sql, params);
    };    
  
  async viewEmpByDeptInclSalary(deptid) {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, role.salary, SUM(role.salary) OVER(PARTITION BY dept.id) AS total_department_salary, ((SUM(role.salary)/SUM(role.salary) OVER(PARTITION BY dept.id))*100) AS pct_of_dept, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name, dept.id AS dept_id, dept.name AS dept_name FROM employee emp LEFT JOIN role ON role_id = role.id LEFT JOIN department dept ON role.department = dept.id LEFT JOIN employee man ON emp.manager_id = man.id WHERE dept.id = ? GROUP BY emp.id, dept.name ORDER BY emp.last_name, emp.first_name ';
    const params = [deptid];
    return runTableQuery(sql, params);
    };

  async viewEmpByDept(deptid) {
    const sql = 'SELECT emp.id, emp.first_name, emp.last_name, emp.role_id, role.title, emp.manager_id, man.first_name AS manager_first_name, man.last_name AS manager_last_name, dept.id AS dept_id, dept.name AS dept_name FROM employee emp LEFT JOIN role ON role_id = role.id LEFT JOIN department dept ON role.department = dept.id LEFT JOIN employee man ON emp.manager_id = man.id WHERE dept.id = ? GROUP BY emp.id, dept.id ORDER BY emp.last_name, emp.first_name ';
    const params = [deptid];
    return runTableQuery(sql, params);
    };    

};


//*****  used in testing functions within this file only. To test, uncomment and run this js file. *******

// // (async () => {
// //   const createEmployee = await new EmployeeClass().createEmployee('Name');
// // })();

// // (async () => {
// //   const updatedEmployee = await new EmployeeClass().updateManager('', 19);
// // })();

 //(async () => {
 // const employees = await new EmployeeClass().viewAllEmployees();
 //})();

//  (async () => {
//   const empByMgt = await new EmployeeClass().viewAllEmployeesByManager();
//  })();

// (async () => {
//   const empByMgt = await new EmployeeClass().viewEmployeeByMgrLastName('Laurent');
//  })();

//  (async () => {
//    const empByMgt = await new EmployeeClass().viewEmployeeByManagerId('1');
//   })();

//  (async () => {
//    const empByMgt = await new EmployeeClass().viewEmpByDeptInclSalary('Human Resources');
//   })();

module.exports = EmployeeClass; 