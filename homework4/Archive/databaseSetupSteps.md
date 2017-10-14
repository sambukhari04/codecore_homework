# Adding Database Reading and Writing from Express.js
1. Create folder `db` in project root folder. This folder will hold neccessary files for Express.js and Pg-promise to use the database.
2. In the folder, create file `index.js`; This file adds in pg-promis with `const pgp = require('pg-promise')()` and sets up base database link.
	* Add code block `const db = pgp({
		host: 'localhost', database: 'exp_tasks'
		})`. In this case, we're running the host off the express app so 'localhost' is chosen. The database used is 'exp_tasks' which can be created with postgresql from terminal. Use any name for this database but make sure to create it with postgresql.
	* Command for creating database with Postgresql `createdb NAME`
	* On the bottom of `index.js` make sure to export the module for express to use: `module.exports = db`
3. If creating a database using Yarn we can add scripts to Yarn to generate tables in our database. Or we can create the database and tables using PostgreSql and psql from the terminal
	* Create file `migrate.js` in the same `db` folder
	* Add `const db = require('./index')` at the top of the file
	* Create a table in the database using a `.query` method
	```
	db.query(*CREATE TABLE tablename (
		id SERIAL,
		columnName COLUMNTYPE,
		columnName COLUMNTYPE
		)*).then(() => {
			console.log('Created a table in database: tablename')
			process.exit()
		}).catch(error => {
			console.error(error)
			process.exit()
		})
	```
		This block of code creates a table our specified database and set up the columns and datatypes we need. It then logs a message to the console upon creating said table, and then exits the process. If there is an error, `.catch` method will catch the error and log it to the console, then exit. REPLACE * IN SNIPPET WITH BACKTICKS.

4. To use faker to fill in fake database row data create a file named `seeds.js` in the same `db` folder.
	* Set up file with `const db = require('./index')` to link to the db index page
	* Add in `const faker = require('faker')` to use Faker from the added in node modules
	* To add fake data to the database table use:

	```
	db.query(*INSERT INTO tablename (column1, column2) VALUES ($<value1>, $<value2>)*,{
		value1 = faker.selection(),
		value2 = faker.selection()
	}).then(()=>{
		console.log('Created Fake Task')
		process.exit()
		})
	```
		This block is used to add fake data using Faker into the database. Select your columns and values depending on what each table requires.
	* `value1` stores a the fake data that the function `faker.selection()` creates. Choose an appropirate selection of fake data in place of the `.selection()` segment. See faker.js on github for available types.
	* `.then(()=>{csonole.log('Created Fake Task')})` confirms that the fake faker data was Created
	* `process.exit()` kills the process once it is finished.
5. PostgreSQL commands
	* `createdb newName;` creates a database called 'newName'. https://www.postgresql.org/docs/9.6/static/app-createdb.html
	* `dropdb databaseName;` permanently deletes the database called 'databaseName'. https://www.postgresql.org/docs/9.6/static/app-dropdb.html
	* `psql databaseName;` enter the database 'databaseName'
	https://www.postgresql.org/docs/9.6/static/tutorial-accessdb.html
	* Once inside a database use normal sql commands to create a table.
	https://www.postgresql.org/docs/9.6/static/tutorial-table.html
	* Once inside the database use normal queries to insert data
	https://www.postgresql.org/docs/9.6/static/tutorial-populate.html
	* Once inside a database use normal queries to view data
	https://www.postgresql.org/docs/9.6/static/tutorial-select.html
	* `DROP TABLE tablename;` can be used to drop a table from a database.
	* Reference link for SQL commands https://www.postgresql.org/docs/9.6/static/tutorial-sql.html
	https://www.postgresql.org/docs/9.6/static/sql-commands.html
	* PostgreSQL commands from terminal
	https://www.postgresql.org/docs/9.6/static/reference-client.html
	* `psql` enters psql at default username database
	* `psql -d database` switch into database called 'database'
	* `\q` from inside psql exit psql
	* `\r` reset query input. When typing inside psql, you can split up multiple line queries using return key. If you make a mistake use `\r` to reset the psql entry and start again. Multiline query commands need to be terminated with a `;` to be executed.
	* `\d tableName` view table structure and column names/types of table named 'tableName'
	* Reference psql commands `\?` for help list
	https://www.postgresql.org/docs/9.6/static/app-psql.html
