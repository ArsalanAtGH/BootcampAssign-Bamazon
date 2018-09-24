var mysql = require("mysql"),
    inquirer = require("inquirer");

var {
    table
} = require('table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mypass",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

function startApp() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                type: "list",
                message: "Please choose an option:",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "whatToDo"
            }])
            .then(function (answer) {
                switch (answer.whatToDo) {
                    case "View Products for Sale":
                        displayProducts(res);
                        break;
                    case "View Low Inventory":
                        displayLowInv(res)
                        break;
                    case "Add to Inventory":
                        console.log("C");
                        break;
                    case "Add New Product":
                        console.log("D");
                        break;
                }
            });
    });
}

function addToInv() {
    
}

function displayLowInv(res) {
    console.log("\nHere is the list of low inventory items:");
    res.forEach(function (element) {
        if (element.stock_quantity < 5)
            console.log(">> " + element.product_name);
    });
    console.log("\n");
    startApp();
}

function displayProducts(res) {
    console.log("\n*****************  Table of Products  *****************")
    var data,
        output;
    data = [
        ['ID', 'NAME', 'DEPARTMENT', 'PRICE', 'QUANTITY']
    ];
    var subArr = [];
    res.forEach(function (element) {
        subArr = [element.id, element.product_name, element.department_name, element.price, element.stock_quantity];
        data.push(subArr);
    });
    output = table(data);
    console.log(output);
    startApp();
}

function takeOrder(res) {
    inquirer
        .prompt([{
            name: "itemID",
            type: "text",
            message: "What is the ID of the product you would like to buy?"
        }, {
            name: "itemCount",
            type: "text",
            message: "How many would you like to buy?"
        }])
        .then(function (answer) {
            res.forEach(function (element) {
                if (element.id === parseInt(answer.itemID)) {
                    if (parseInt(answer.itemCount) > element.stock_quantity) {
                        console.log("\n********  Insufficient quantity!  ********\n");
                        takeOrder(res);
                    } else {
                        var newStock = element.stock_quantity - parseInt(answer.itemCount);
                        connection.query(
                            "UPDATE bamazon.products SET ? WHERE ?",
                            [{
                                    stock_quantity: newStock
                                },
                                {
                                    id: parseInt(answer.itemID)
                                }
                            ],
                            function (err) {
                                if (err) throw err;
                                console.log("\n>>>>>>>>>>  Order placed successfully!  <<<<<<<<<<\n");
                                var granTotal = parseInt(answer.itemCount) * element.price;
                                console.log(">>>>>>>>>>  Your grand total is: $" + granTotal + "  <<<<<<<<<<\n");
                                startApp();
                            }
                        );
                    }
                }
            });

        });
}