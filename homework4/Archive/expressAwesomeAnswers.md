# Express.js bulid like Rails
Express has a generator like Rails
1. install the Express Generator package for generating Express projects. Run in terminal `npm install -g express-generator`
  * only run this for first time
2. create a project folder `express --view ejs --css sass AwesomeAnswersExpress`
  * will uses ejs for templates and sass for css processing
3. go into folder and set up git `git init` and make first commit
4. install yarn modules `yarn install` like bundle in rails
5. put folder `node_modules/` and `.DS_Store` into `.gitignore` file
6. `package.json` specifies all the plug ins and scripts we can customize to run other commands
7. folder `bin/www` file holds config files for the server including port setup.
8. file `app.js` is full of setup features for the project
  * set sass syntax in line `indentedSyntax: true, // true = .sass and false = .scss` if needed
  * stylesheets are in `public/stylesheets`
9. install nodemon as a development dependency `yarn add nodemon -D`
  * use nodemon for server development `"start": "nodemon ./bin/www"` by typing `yarn start`
  * use debug `"start": "nodemon ./bin/www",
    "debug": "nodemon --inspect ./bin/www"` by typing `yarn debug`
10. instead of 'pg-promise' for database, we will use something similar to Rails ActiveRecord, `yarn add sequelize pg pg-hstore`. this installs 3 packages, 'sequelize', 'pg' 'pg-hstore' for database management.
  * sequelize provides a command line tool which can generate migrations, seeds, models, controllers. `npm i -g sequelize sequelize-cli pg pg-hstore` installs features similar to Rails Console. only need to do this one time to install the progam on your computer
  * in console type `sequelize` to see commands avaliable
  * run `sequelize init` in project folder to set up sequelize project files and folders so project is organized like rails with config, migrations, models folders.
11. express vs rails. Express we need to choose all our modules separately.
12. setup database. in `config.json` change all `"dialect": "postgres"` and `"database": "aae_dev"`
13. in `package.json` add into scripts section `"db:create": "createdb aae_dev"` so that we can run `yarn db:create` to create the database or `yarn db:drop` to drop the database with `"db:drop": "dropdb --if-exists --echo aae_dev"`
  * to set up a master database reset `"db:reset": "yarn db:drop && yarn db:create && sequelize db:migrate && sequelize db:seed:all && yarn start"`

# Set Up First Models
1. create migration `sequelize model:create --name Question --attributes title:string,content:text` creates migrations file and model questions.js.
  * up method is the code that will run when creating
  * down method is code that will issue rollback
  * model names are Capitalized and singular
2. in the model.js we need to edit the 'classMethods' as noted to change association definitintions
3. run the migration `sequelize db:migrate`
4. file `index.js` is a file that takes all the models, combines them and then exports them for user in other files.
  * in node console check `let models = require('./models')`
  * save it as a variable `const {Question} = models` so we can use it like Rails Console to play with the database models
  * to build a record like Question.new in rails `q = Question.build({title: 'stuff', content: 'More stuff'})`
  * to save a record like q.save in rails `q.save()`
  * to crate a record like Question.create in rails `q = Question.create({title: 'stuff', content: 'More stuff'})`
  * to view records like Question.all in rails `Question.findAll({raw: true}).then(console.info)`
  * check sequelize documents to learn how sequelize works like ActiveRecord. model usage

# Creating Seeds with Faker JS
1. install faker for development `yarn add -D faker`
2. generate another migration for generating seed file `sequelize seed:create --name create-questions` create seeds for each different model rather than one big seed file
3. in folder `seeders/file.js` remove notes and require the connected model with `const {Question} = require('../models')`
4. methods up and down must always return a promise. this is the only way sequelize can know that the seed is complete
5. at the top fo the file require the faker `const faker = require('faker')`
6. use `Array.from({length: 20})` will create an Array with 20 items and `Array.from({length: 20}).map((v,i)=>i)` will create an array with 20 items with the items mapped out counting up from 0. view seed file for example.
7. run the seed file `sequelize db:seed:all` check it it works `psql -d aae_dev` and `SELECT * FROM "Questions";`

# Routes and Controllers
1. rename users.js to questions.js
2. in `app.js` change line 10 from users to questions `const questions = require('./routes/questions');` this allows the router to point to the right controller file
3. add a route for that const questions with `app.use('/questions', questions);` now the app will point to the `routes/question.js`
4. check to see in browser at `localhost:3333/question`
  * to see data in raw json `res.send({questions})`

# Set Up Views and Partials
1. in the `views` folder, create a `partials` folder and then create `header.ejs` and `footer.ejs` files set up as templates
2. for body pages add in `<%- include('./partials/header') %>` where you want to have a partial render
3. for displaying questions view, create folder `questions` in `views` and then file `index.ejs` for showing the questions#index get request. add in partial render templates
4. in `index.ejs` set up the file to include headers and footers. to display the list of questions, set up a loop to loop through questions. `for (let question of questions) {` questions will be an array of data coming from sequelize. we need to set up getting the data from the database
5. getting data for views. data for views comes from the `routes/questions.js` file. in here we list the crud actions and query the database and send/render data back to the view.
  ```javascript
  router.get('/', function(req, res, next) {
  Question
  .all()
  .then(questions => {
    res.render('questions/index', {questions})
    })
  })
  ```
  * Here we have on 'router.get' query the database with `question.all()` to get all the questions. This returns a promise so we have to use `.then(argument => {` to capture the promise return data. we define a name for this variable which is in the form of an array as argument or 'questions' or whatever.
  * to pass this to the view we use `res.render('questions/index', {questions})` which is says, send the response with a render of template 'questions/index' with the 'argument' or 'questions' as the data object to return.
  * we can then access the data object 'argument' or 'questions' from the view page in the form of an array. to loop through with `for (let question of questions) { ...`

6. set up show route/action. similar to the get action, we are going to define the get url, query the database, and render the view with the data included.
  ```javascript
  router.get('/:id', (req, res, next) => {
  const {id} = req.params
  Question
    .findById(id)
    .then(question => {
      res.render('questions/show', {question})
    })
    .catch(error => next(error))
  })
  ```
  * 'router.get('/:id', ...' defines the get request to any url with and id parameter attached as a directive to show that resource.
  * all the parameters of the request can be seen in `req.params`
  * we search through the req.params to find the `id` key and save it as a const in one line `const {id} = req.params`
  * then we query the database to retrieve the question with that id `Question.findById(id)` which uses the id stored in `const {id} = req.params` as the argument to find the question.
  * Again the data returned by sequelize will be a promise return, so we need to use a `.then(question) =>` to save this data as an variable. we can name the argument whatever but in this case again we use 'question' becuase it is a question.
  * after we grab the data from the database, we send it back on a view with `res.render('questions/show', {question})`. the response to the get request is a render of 'questions/show' view with the data {question} which is the returned data we saved from the .then function from the sequlize query.
  * we can add a `.catch(error => next(error))` if the promise cannot be fulfilled and an error occurs. This will send an error response back instead of the data.
