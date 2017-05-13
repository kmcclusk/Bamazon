var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "Bamazon"
});

connection.connect(function(err) {
	if(err) throw err;
	start();
});

var start = function() {
	inquirer.prompt({
		name: "action",
		type: "list",
		message: "What type of item would you like to buy?",
		choices: ["Health and Beauty", "Food and Beverage", "School Supplies"]
		}).then(function(answer) {

			switch (answer.action) {
				case "Health and Beauty":
					beautySearch();
					break;

				case "Food and Beverage":
					foodSearch();
					break;

				case "School Supplies":
					schoolSearch();
					break;
			}
		});
};

var beautySearch = function() {

	// var query = "SELECT * FROM products WHERE department_name = 'Health and Beauty'"

	connection.query("SELECT * FROM products WHERE department_name = 'Health and Beauty'", function(err, res){
		
		if (err) throw err;
	
			inquirer.prompt([
			{
				name: "items",
				type: "rawlist",
				choices: function(){

							var choiceArray = [];

							for (var i = 0; i < res.length; i++){

								choiceArray.push(res[i].product_name + " $ " + res[i].price);
							}
							return choiceArray;
						},
				
				message: "Which item would you like to buy?"
			},
			{
				name: "amount",
				type: "input",
				message: "How many would you like to buy?"

			}]).then(function(answer){

		    var chosenItem;
		    var total;
		    var customerAmount = answer.amount;

		    for (var i = 0; i < res.length; i++) {

		    	if (res[i].product_name + " $ " + res[i].price === answer.items) {

		        	chosenItem = res[i];

		        	total = answer.amount * chosenItem.price;

		        	console.log("\nYou're total is " + " $ " + total 
		        		+ "\n");

		        	inquirer.prompt([{
							name: "text",
							type: "input",
							message: "would you like to check out --- yes or no?"
						}]).then(function(answer){
							if(answer.text.toLowerCase() === "yes") {

								var newQuantity = chosenItem.stock_quantity - customerAmount;

								if (customerAmount <= chosenItem.stock_quantity){

									connection.query("UPDATE products SET ? WHERE ?", [{

										stock_quantity: newQuantity

									},{

										id: chosenItem.id

									}], function(err){
										if(err) throw err;
										console.log("\nTHANK YOU!\n");

										start();
									});

								} else if (customerAmount > chosenItem.stock_quantity){

									console.log("\nWe do not have that amount in stock\n");
									start();

								} 
							} else {
								console.log("\nTake your time!\n");
								start();
							}
						})
		        }
			}
			})
	})
};

