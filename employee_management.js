var mysql = require("mysql");
var inquirer = require("inquirer");
// var http = require("http");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 8080
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_managementDB"
});


function inputData() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department you would like to input?"
      },
      {
        name: "role",
        type: "input",
        message: "What role would you likento query?"
      },
      {
        name: "employee",
        type: "input",
        message: "Which employee name would you like to enter?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
}



connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createInfo();
});



function createInfo() {
  console.log("Inserting a new Info...\n");
  var query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: "Rocky",
      last_name: "Brown",
      role_id: 23350,
      manager_id: 00023
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateEmployee AFTER the INSERT completes
      updateEmployee();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateEmployee() {
  console.log("Updating updating employee info...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE first_name = ? AND last_name = ?", [{ role_id: 1}, 'Rocky', 'Brown'], 
    
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      // deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}