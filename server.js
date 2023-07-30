const runQueries = require('./run-queries');

async function main() {
  try {
    // Create a new department
    const departmentId = await runQueries.createDepartment('newDept', true);
    console.log('Created new department with ID:', departmentId);

    // Create a new role
    const roleId = await runQueries.createRole('newRole', 30000000, departmentId, true);
    console.log('Created new role with ID:', roleId);

    // Insert a new employee
    await runQueries.createEmployee('new', 'Employee', roleId, null, true);
    console.log('Created new employee successfully');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();

async function main1() {
  try {
    // Fetch all employees
    const employees = await dbFunctions.getAllEmployees();
    console.table(employees);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main1();