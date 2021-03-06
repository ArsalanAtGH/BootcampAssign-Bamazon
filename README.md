# :link: Me on GitHub
* My [profile](https://github.com/Arsalan-Sadri)
  * All repositories, source codes, READMEs, pull requests, commits, issues, and...
* My [portfolio](https://Arsalan-Sadri.github.io)
  * Find all deployed applications. 

# :page_with_curl: Description
* A fully-featured Node.js console application simulating a online retail shopping experience like that of Amazon.
* There is an inventory of miscellaneous items stored in MySQL database.
* As it can be seen below, items get pulled and displayed in a tabular format to customers and managers.
* The inventory can be updated and items can be added to and removed from database through command line (console).

<img src="Docs/Images/inventory_table.png" width="600" height="500">


# :nut_and_bolt: Tools and Technologies
* Languages, libraries, and frameworks: `JavaScript`
* DB Server: `MySQL`
* Runtime Environment: `Node.js`
* Dependencies: `inquirer`, `mysql`, `table`
* Package Manager: `npm`
* Version control: `Git`
* Editor: `Visual Studio Code`
* Operating System: `Mac OS`

# :arrow_forward: Deployed Application
* See the [application]() up and running via GitHub Pages directly from its depository.


# :tv: Demo
* [Here]() see a short demo of this application on my YouTube channel!

# :wrench: How to Run
In order to run the application on your device, follow the instructions given below:
1. **Clone down** the application to your local device
2. **Install the packages** specified in `package.json`
3. Get your **database** up and running.
   1. Start MySQL server
      * On Mac: Open **Spotlight Search**, type in **mysql**, then choose **mysql.prefPane**,
       enter your password, and finally hit **Start MySQL Server**
   2. Create schema using `schema.sql`
   3. Add data to your database using `seeds.sql`
   4. Modify port, user, and password in the corresponding `.js` to reflect your credential.
4. Open **terminal** (on mac)
5. There are 2 options:
  * If you wish to run the app as a customer and do shopping, then : `$ node bamazonCustomer.js`
  * If you wish to see it as a manager: `$ node bamazonManager.js`
6. Finally, **follow instructions** on the console to proceed further. 

# :key: Technical Highlights
1. Tabular illustration of data
   * ...