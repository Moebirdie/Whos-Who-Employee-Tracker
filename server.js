const DepartmentClass = require('./lib/departments');
const RoleClass = require('./lib/roles');
const EmployeeClass = require('./lib/employees');
const mysql = require('mysql');
const inquirer = require('./node_modules/inquirer');
const { deptChoices, mgrChoices, roleChoices, employeeChoices } = require("./helpers/runqueries")


const isQuesAnswered = async (input) => {
  if (input) {
    return true;
  }
  return "Answer is required."
};

const actionQuestion = [
  {
    type: 'list',
    message: 'Choose the action you want to perform:',
    name: 'actionItem',
    choices: ['VIEW all departments',
      'VIEW all roles',
      'VIEW all employees',
      'VIEW all employees by manager',
      'VIEW all employees by department',
      'VIEW employees of a specific department',
      'VIEW total utilized budget for a specific department with details',
      'ADD a department',
      'ADD a role',
      'ADD an Employee',
      'UPDATE an employee role',
      'UPDATE an employee manager',
      'UPDATE a salary for a role',
      'UPDATE a department name',
      'DELETE a deparment',
      "DELETE a role",
      "DELETE an employee"
    ],
    loop: false,
  }
]

const viewEmpbyDeptQuestions = [
  {
    type: 'list',
    message: 'What department would you like to view?',
    name: 'viewEmpDeptId',
    choices: deptChoices
  }
]

const addDepartmentQuestions = [
  {
    type: 'input',
    message: 'What is the name of the department to add?',
    name: 'addDeptName',
    validate: isQuesAnswered
  }
]

const addRoleQuestions = [
  {
    type: 'input',
    message: 'What is the TITLE of the role to add?',
    name: 'addRoleTitle',
    validate: isQuesAnswered
  },
  {
    type: 'input',
    message: 'What is the SALARY of the role to add (exclude decimal places)?',
    name: 'addRoleSalary',
    validate: isQuesAnswered
  },
  {
    type: 'list',
    message: 'What department is this role for?',
    name: 'addRoleDept',
    choices: deptChoices,
    validate: isQuesAnswered
  }
]

const addEmployeeQuestions = [
  {
    type: 'input',
    message: 'What is the FIRST NAME of the employee to add?',
    name: 'addFirstName',
    validate: isQuesAnswered
  },
  {
    type: 'input',
    message: 'What is the LAST NAME of the employee to add?',
    name: 'addLastName',
    validate: isQuesAnswered
  },
  {
    type: 'list',
    message: 'What TITLE does the employee have?',
    name: 'addRoleId',
    choices: roleChoices
  },
  {
    type: 'list',
    message: 'Who is the MANAGER of the employee?',
    name: 'addMgrId',
    choices: mgrChoices
  }
]

const updateRoleSalaryQuestions = [
  {
    type: 'list',
    message: 'What role would you like to update?',
    name: 'updateRoleId',
    choices: roleChoices,
    validate: isQuesAnswered
  },
  {
    type: 'input',
    message: 'What is the new SALARY of the role? (exclude decimal places)?',
    name: 'updateRoleSalary',
    validate: isQuesAnswered
  }
]

const updateRoleEmployeeQuestions = [
  {
    type: 'list',
    message: 'Which employee would you like to update?',
    name: 'updateId',
    choices: employeeChoices
  },
  {
    type: 'list',
    message: 'What is the new ROLE of the employee?',
    name: 'updateRole',
    choices: roleChoices
  }
]

const updateMgrQuestions = [
  {
    type: 'list',
    message: 'Which employee would you like to update?',
    name: 'updateId',
    choices: employeeChoices
  },
  {
    type: 'list',
    message: 'Who is the new MANAGER of the employee?',
    name: 'updateMgrId',
    choices: mgrChoices
  }
]

const deleteDepartmentQuestions = [
  {
    type: 'list',
    message: 'Which DEPARTMENT would you like to delete?',
    name: 'deptId',
    choices: deptChoices
  }
]

const deleteRoleQuestions = [
  {
    type: 'list',
    message: 'Which ROLE would you like to delete?',
    name: 'roleId',
    choices: roleChoices
  }
]

const deleteEmpQuestions = [
  {
    type: 'list',
    message: 'Which EMPLOYEE would you like to delete?',
    name: 'empId',
    choices: employeeChoices
  }
]




function viewDepartments() {
  const department = new DepartmentClass().viewAllDepartments();
};

function viewRoles() {
  const role = new RoleClass().viewAllRoles();
};

function viewEmployees() {
  const employee = new EmployeeClass().viewAllEmployees();
};

function viewAllEmpByMgr() {
  const employee = new EmployeeClass().viewAllEmployeesByManager();
};

function viewAllEmpByDept() {
  const employee = new EmployeeClass().viewAllEmpByDept();
};


function viewEmpByDept() {
  inquirer.prompt(viewEmpbyDeptQuestions)
    .then((viewByDeptAnswers) => {
      const viewByDepartment = new EmployeeClass().viewEmpByDept(viewByDeptAnswers.viewEmpDeptId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}
function addEmployee() {
  inquirer.prompt(addEmployeeQuestions)
    .then((addEmployeeAnswers) => {
      const addEmployees = new EmployeeClass().createEmployee(addEmployeeAnswers.addFirstName, addEmployeeAnswers.addLastName, addEmployeeAnswers.addRoleId, addEmployeeAnswers.addMgrId, 1)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function viewEmpByDeptInclSalary() {
  inquirer.prompt(viewEmpbyDeptQuestions)
    .then((viewByDeptAnswers) => {
      const viewByDepartment = new EmployeeClass().viewEmpByDeptInclSalary(viewByDeptAnswers.viewEmpDeptId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function addDepartment() {
  inquirer.prompt(addDepartmentQuestions)
    .then((addDeptAnswers) => {
      const addNewDepartment = new DepartmentClass().createDepartment(addDeptAnswers.addDeptName)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function addRole() {
  inquirer.prompt(addRoleQuestions)
    .then((addRoleAnswers) => {
      console.log(addRoleAnswers)
      const addNewRole = new RoleClass().createRole(addRoleAnswers.addRoleTitle, addRoleAnswers.addRoleSalary, addRoleAnswers.addRoleDept, 1)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function updateRoleSalary() {
  inquirer.prompt(updateRoleSalaryQuestions)
    .then((updateRoleAnswers) => {
      const updateRoleSalary = new RoleClass().updateRoleSalary(updateRoleAnswers.updateRoleSalary, updateRoleAnswers.updateRoleId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function updateRoleEmployee() {
  inquirer.prompt(updateRoleEmployeeQuestions)
    .then((updateRoleAnswers) => {
      const updateRoleEmployee = new EmployeeClass().updateRoleId(updateRoleAnswers.updateRoleId, updateRoleAnswers.Id)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function updateMgrEmployee() {
  inquirer.prompt(updateMgrQuestions)
    .then((updateMgrAnswers) => {
      const updateMgrEmployee = new EmployeeClass().updateManagerId(updateMgrAnswers.updateMgrId, updateMgrAnswers.updateId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function deleteDepartment() {
  inquirer.prompt(deleteDepartmentQuestions)
    .then((deleteDepartmentAnswers) => {
      const deleteDepartment = new DepartmentClass().deleteDepartment(deleteDepartmentAnswers.deptId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function deleteRole() {
  inquirer.prompt(deleteRoleQuestions)
    .then((deleteRoleAnswers) => {
      const deleteRole = new RoleClass().deleteRole(deleteRoleAnswers.RoleId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function deleteEmployee() {
  inquirer.prompt(deleteEmpQuestions)
    .then((deleteEmpAnswers) => {
      const deleteEmployee = new EmployeeClass().deleteEmployee(deleteEmpAnswers.EmpId)
        .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

//function askQuestions() {
// changed to case statement for cleaner code

inquirer
  .prompt(actionQuestion)
  .then((answers) => {
    console.log(answers);

    switch (answers.actionItem) {
      case 'VIEW all departments':
        viewDepartments();
        break;
      case 'VIEW all roles':
        viewRoles();
        break;
      case 'VIEW all employees':
        viewEmployees();
        break;
      case 'VIEW all employees by manager':
        viewAllEmpByMgr();
        break;
      case 'VIEW all employees by department':
        viewAllEmpByDept();
        break;
      case 'VIEW employees of a specific department':
        viewEmpByDept();
        break;
      case 'ADD a department':
        addDepartment();
        break;
      case 'ADD a role':
        addRole();
        break;
      case 'ADD an Employee':
        addEmployee();
        break;
      case 'UPDATE a salary for a role':
        updateRoleSalary();
        break;
      case 'UPDATE an employee role':
        updateRoleEmployee();
        break;
      case 'UPDATE an employee manager':
        updateMgrEmployee();
        break;            
      case 'Update an employees of a specific department':
        viewEmpByDept();
        break;
      case 'VIEW total utilized budget for a specific department with details':
        viewEmpByDeptInclSalary();
        break;
      case 'DELETE a deparment':
        deleteDepartment();
        break;
      case 'DELETE a role':
        deleteRole();
        break;
      case 'DELETE an employee':
        deleteEmployee();
        break;
      default:
        console.log('Invalid action item');
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error);
    }
  });
