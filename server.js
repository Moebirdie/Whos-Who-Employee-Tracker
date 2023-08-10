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
      "DELETE an employee",
      "Quit"
    ],
    loop: false,
  }
]

const viewEmpbyDeptQuestions = [
  {
    type: 'list',
    message: 'What department would you like to view?',
    name: 'viewEmpDeptId',
    choices: deptChoices,
    loop: false
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
    loop: false
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
    choices: roleChoices,
    loop: false
  },
  {
    type: 'list',
    message: 'Who is the MANAGER of the employee?',
    name: 'addMgrId',
    choices: mgrChoices,
    loop: false
  }
]

const updateRoleSalaryQuestions = [
  {
    type: 'list',
    message: 'What role would you like to update?',
    name: 'updateRoleId',
    choices: roleChoices,
    loop: false
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
    choices: employeeChoices,
    loop: false
  },
  {
    type: 'list',
    message: 'What is the new ROLE of the employee?',
    name: 'updateRole',
    choices: roleChoices,
    loop: false
  }
]

const updateMgrQuestions = [
  {
    type: 'list',
    message: 'Which employee would you like to update?',
    name: 'updateId',
    choices: employeeChoices,
    loop: false
  },
  {
    type: 'list',
    message: 'Who is the new MANAGER of the employee?',
    name: 'updateMgrId',
    choices: mgrChoices,
    loop: false
  }
]

const deleteDepartmentQuestions = [
  {
    type: 'list',
    message: 'Which DEPARTMENT would you like to delete?',
    name: 'deptId',
    choices: deptChoices,
    loop: false
  }
]

const deleteRoleQuestions = [
  {
    type: 'list',
    message: 'Which ROLE would you like to delete?',
    name: 'roleId',
    choices: roleChoices,
    loop: false
  }
]

const deleteEmpQuestions = [
  {
    type: 'list',
    message: 'Which EMPLOYEE would you like to delete?',
    name: 'empId',
    choices: employeeChoices,
    loop: false
  }
]

const updateDeptNameQuestions = [
  {
    type: 'list',
    message: 'Which Department Name would you like to update?',
    name: 'id',
    choices: deptChoices,
    loop: false
  },
  {
    type: 'input',
    message: 'What is the new name of the Department?',
    name: 'newName',  
  }

]




async function viewDepartments() {
  const department = new DepartmentClass().viewAllDepartments()
  await department
  .then(()=> {
    askQuestions();
  })
.catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error)
    }
  })
};

async function viewRoles() {
  const role = new RoleClass().viewAllRoles()
  await role
  .then(()=> {
    askQuestions();
  })
.catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error)
    }
  })
};

async function viewEmployees() {
  const employee = new EmployeeClass().viewAllEmployees()
  await employee
  .then(()=> {
    askQuestions();
  })
.catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error)
    }
  })
};

async function viewAllEmpByMgr() {
  const employee = new EmployeeClass().viewAllEmployeesByManager()
  await employee
  .then(()=> {
    askQuestions();
  })
.catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error)
    }
  })
};

async function viewAllEmpByDept() {
  const employee = new EmployeeClass().viewAllEmpByDept()
  await employee
  .then(()=> {
    askQuestions();
  })
.catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log(error)
    }
  })
};


async function viewEmpByDept() {
  inquirer.prompt(viewEmpbyDeptQuestions)
    .then((viewByDeptAnswers) => {
  const viewByDepartment = new EmployeeClass().viewEmpByDept(viewByDeptAnswers.viewEmpDeptId)
  .then(()=> {
    askQuestions();
  })
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
      .then(()=> {
        askQuestions();
      })  
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
      .then(()=> {
        askQuestions();
      })  
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
      .then(()=> {
        askQuestions();
      })  
      .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

function updateDepartmentName() {
  inquirer.prompt(updateDeptNameQuestions)
    .then((updateDeptNameAnswers) => {
      const updateDeptName = new DepartmentClass().updateDepartmentName(updateDeptNameAnswers.newName, updateDeptNameAnswers.id)
      .then(()=> {
        askQuestions();
      })  
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
      const addNewRole = new RoleClass().createRole(addRoleAnswers.addRoleTitle, addRoleAnswers.addRoleSalary, addRoleAnswers.addRoleDept, 1)
      .then(()=> {
        askQuestions();
      })  
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
      .then(()=> {
        askQuestions();
      })
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
      const updateRoleEmployee = new EmployeeClass().updateRoleId(updateRoleAnswers.updateRole, updateRoleAnswers.updateId)
      .then(()=> {
        askQuestions();
      })  
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
      .then(()=> {
        askQuestions();
      })  
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
      .then(()=> {
        askQuestions();
      })  
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
      const deleteRole = new RoleClass().deleteRole(deleteRoleAnswers.roleId)
      .then(()=> {
        askQuestions();
      })  
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
      const deleteEmployee = new EmployeeClass().deleteEmployee(deleteEmpAnswers.empId)
      .then(()=> {
        askQuestions();
      })  
      .catch((error) => {
          if (error.isTtyError) {
            console.log(error);
          } else {
            console.log(error)
          }
        })
    })
}

// changed to case statement for cleaner code
function askQuestions() {
  inquirer
    .prompt(actionQuestion)
    .then((answers) => {
      // console.log(answers);
      switch (answers.actionItem) {
        case 'VIEW all departments':
          return viewDepartments();
        case 'VIEW all roles':
          return viewRoles();
        case 'VIEW all employees':
          return viewEmployees();
        case 'VIEW all employees by manager':
          return viewAllEmpByMgr();
        case 'VIEW all employees by department':
          return viewAllEmpByDept();
        case 'VIEW employees of a specific department':
          return viewEmpByDept();
        case 'VIEW total utilized budget for a specific department with details':
          return viewEmpByDeptInclSalary();
        case 'ADD a department':
          return addDepartment();
        case 'ADD a role':
          return addRole();
        case 'ADD an Employee':
          return addEmployee();
        case 'UPDATE an employee role':
          return updateRoleEmployee();
        case 'UPDATE an employee manager':
          return updateMgrEmployee();
        case 'UPDATE a salary for a role':
          return updateRoleSalary();
        case 'UPDATE a department name':
          return updateDepartmentName();
        case 'DELETE a deparment':
          return deleteDepartment();
        case 'DELETE a role':
          return deleteRole();
        case 'DELETE an employee':
          return deleteEmployee();
        case 'Quit':
          return process.exit(0);
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
}

askQuestions();



