var mysql = require("mysql");
var inquirer = require("inquirer");
var http = require('http');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3002
  port: 8080,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_managementDB"
});

connection.connect(function (err) {
  if (err) throw err;
  trackEmployee();
});

function trackEmployee() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [

      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Find employee by name":
          trackEmployee();
          break;

        // case "Find all artists who appear more than once":
        //   multiSearch();
        //   break;

        // case "Find data within a specific range":
        //   rangeSearch();
        //   break;

        // case "Search for a specific song":
        //   songSearch();
        //   break;

        // case "Find artists with a top song and top album in the same year":
        //   songAndAlbumSearch();
        //   break;
      }
    });
}