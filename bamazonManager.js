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
                message: "PLEASE CHOOSE AN OPTION:",
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
                        addToInv(res);
                        break;
                    case "Add New Product":
                        addNewItem(res);
                        break;
                }
            });
    });
}

function addNewItem() {
    inquirer
        .prompt([{
            name: "itemName",
            type: "text",
            message: "Please enter the product's NAME:"
        }, {
            name: "itemDept",
            type: "text",
            message: "Please enter the product's DEPARTMENT:"
        }, {
            name: "itemPrice",
            type: "text",
            message: "Please enter the product's PRICE:"
        }, {
            name: "itemCount",
            type: "text",
            message: "Please enter the product's COUNT:"
        }])
        .then(function (answer) {
            if (parseInt(answer.itemCount) > 0) {
                connection.query(
                    "INSERT INTO bamazon.products SET ?", {
                        product_name: answer.itemName,
                        department_name: answer.itemDept,
                        price: answer.itemPrice,
                        stock_quantity: answer.itemCount
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " product inserted!\n");
                        startApp();
                    }
                );
            }
        });
}

function addToInv(res) {
    inquirer
        .prompt([{
            name: "itemID",
            type: "text",
            message: "Please enter the product's ID you wish to add more to the stock:"
        }, {
            name: "itemCount",
            type: "text",
            message: "How many items would you like to add more?"
        }])
        .then(function (answer) {
            res.forEach(function (element) {
                if ((element.id === parseInt(answer.itemID)) && (parseInt(answer.itemCount) > 0)) {
                    var newStock = element.stock_quantity + parseInt(answer.itemCount);
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
                            console.log("\n>>>>>>>>>>  Items were added successfully!  <<<<<<<<<<\n");
                            startApp();
                        }
                    );

                }
            });

        });
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