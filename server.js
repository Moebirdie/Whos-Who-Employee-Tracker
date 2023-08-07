const DepartmentClass = require('./lib/departments');
const RoleClass = require('./lib/roles');
const EmployeeClass = require('./lib/employees');
const mysql = require('mysql');
const inquirer = require('./node_modules/inquirer');
const { deptChoices, mgrChoices, roleChoices } = require("./helpers/runqueries")


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
      'UPDATE a salary for a role by role name',
      'UPDATE a salary for a role by role id',
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
    const addEmployees = new EmployeeClass().createEmployee(addEmployeeAnswers.addFirstName, addEmployeeAnswers.addLastName, addEmployeeAnswers.addRoleId, addEmployeeAnswers.addMgrId, 1 )  
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
    const addNewRole = new RoleClass().createRole(addRoleAnswers.addRoleTitle,addRoleAnswers.addRoleSalary,addRoleAnswers.addRoleDept,1)  
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
      case 'ADD a department':
        addDepartment();
        break;
      case 'ADD a role':
        addRole();
        break;
      case 'ADD an Employee':
        addEmployee();
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
      case 'VIEW total utilized budget for a specific department with details':
        viewEmpByDeptInclSalary();
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
