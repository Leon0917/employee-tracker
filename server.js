var mysql = require("mysql");

var inquirer = require("inquirer");

// connect to database

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_managementDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  inputData();
});

function inputData() {
  inquirer
    .prompt([
      {
        name: "type",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["addDepartment", "addEmployee", "addRole", "viewDepartments", "viewRoles", "viewEmployees", "updateEmployeesRole", "exit"]
      },

    ])
    .then(function (answer) {
      // based on their answer, the correspondig function will be called
      if (answer.type === "department") {
        addDepartment();
      }
      else if (answer.type === "employee") {
        addEmployee();
      }
      else if (answer.type === "role") {
        addRole();
      }
      else if (answer.type === "ViewDepartment") {
        viewDepartments();
      }
      else if (answer.type === "viewRole") {
        viewRole();
      }
      else if (answer.type === "viewEmployees") {
        viewEmployees();
      }
      else if (answer.type === "updateEmployeesRole") {
        updateEmployeesRole();
      }
      else {
        connection.end();
      }
    });
}


function addDepartment() {
  inquirer
    .prompt([{
      name: "department_name",
      type: "input",
      message: "What is the name of the department?"

    }
    ])
    .then(answer => {
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department_name,

        },
        () => {
          inputData()
        }

      )
    })
}

function addRole() {
  inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "What is the title?"

    },
    {
      name: "salary",
      type: "input",
      message: "What is the employee's salary?"

    },
    {
      name: "department_id",
      type: "input",
      message: "What is the department_id?"
    }

    ])
    .then(answer => {
      var query = connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id
        },
        () => {
          inputData()
        }

      )
    })
}

function addEmployee() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"

    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the employee,s role id number?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is the manager's id?",
    },
    ])
    .then(answer => {
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        () => {
          inputData()
        }

      )
    })
}

//  Update a department
function updateEmployeesRole() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee you want to update?"

    },
    {
      name: "last_name",
      type: "input",
      message: "What is the last name of the employee you would to update?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the updated role id number?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is the updated manager's id?",
    },
    ])
    .then(answer => {
      var query = connection.query(
        "UPDATE INTO emplyoyee SET ? WHERE ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        () => {
          inputData()
        }

      )
    })
}