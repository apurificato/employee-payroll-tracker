// Reference to the #add-employees-btn element. This will be used in conjunction with event listener at bottom of page.
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collection of employee data. Includes function to collect employees and the prompts that user will be presented with, enabling them to enter each piece of data that will be collected, stored, displayed in the console and on the front end of the page (in the table).
const collectEmployees = function() {
  const employees = []
  let keepGoing = true
  
  while (keepGoing) {
    const firstName = prompt("Type employee's first name.")
    const lastName = prompt("Type employee's last name.")
    let salary = prompt("Type employee's salary (please enter without commas).")

    if (isNaN(salary)) {
      salary = 0; // Salary set to 0 if it's not a number
    } else {
      salary = parseFloat(salary); // Converts salary to have formatting, like commas
    }
// Each one of these correspond to the prompts that pop up, where user can input the appropriate data that will be collected.
    const currentEmployee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    }

    employees.push(currentEmployee)

    const wantsToContinue = confirm("Click okay to add more employee data") //This is another prompt that confirms if user wants to keep inputting data. If they don't, then they will be exited out, with the final data stored/display in console and displayed in the table on the front end of the page.

    keepGoing = wantsToContinue
  }

  console.log(employees)
  return employees
}

// Displays the average salary of all of the employees
const displayAverageSalary = function(employeesArray) {
  let totalSalary = 0;
  employeesArray.forEach(employee => {
      totalSalary += employee.salary;
  });
  
  const averageSalary = totalSalary / employeesArray.length;
  
  const output = `Average Salary: $${averageSalary.toFixed(2)} | Number of Employees: ${employeesArray.length}`;
  
  console.log(output);
}

// Selects a random employee and displays their name in the console
const getRandomEmployee = function(employeesArray) {
  // Generates a random index within the range of the employeesArray length
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  
  // Gets the random employee object from the array using the random index
  const randomEmployee = employeesArray[randomIndex];
  
  // Template literal string to display the random employee's full name
  const fullName = `${randomEmployee.firstName} ${randomEmployee.lastName}`;
  
  // Logs the random employee's full name to the console
  console.log("Congratulations to " + `${fullName}` + " our random lottery drawing winner!");
}
/*
  ====================
  STARTER CODE (Did not modify)
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
