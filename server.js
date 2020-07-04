var mysql = require("mysql");
var inquirer = require("inquirer");


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


function inputData() {
  inquirer
    .prompt([
      {
        name: "type",
        type: "rawlist",
        message: "What area would you like to add data to?",
        choices: ["department", "employee", "role", "exit"]
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
      else {
        connection.end();
      }
    });
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  inputData();
});

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



  // console.log("Inserting a new Info...\n");
  // var query = connection.query(
  //   "INSERT INTO employee SET ?",
  //   {
  //     first_name: answer.first_name,
  //     last_name: answer.last_name,
  //     role_id: answer.role_id,
  //     manager_id: answer.manager_id
  //   },

  //   function (err, res) {
  //     if (err) throw err;
  //     console.log(res.affectedRows + " product inserted!\n");
  //     // Call updateEmployee AFTER the INSERT completes
  //     updateEmployee();
  //   }
  // );

  // logs the actual query being run
  // console.log(query.sql);


// function updateEmployee() {
//   console.log("Updating updating employee info...\n");
//   var query = connection.query(
//     "UPDATE employee SET ? WHERE first_name = ? AND last_name = ?", [{ role_id: answer.role_id }], '', '',

//     function (err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " employee updated!\n");
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }
