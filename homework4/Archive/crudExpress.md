# CRUD in Express

#### New
1. use router.get or router.post for creating crud actions. `router.get('/new') ...` will send get request to 'questions/new' since we're already inside the questions route file. paths are relative not absolute to the rout url.
2. set response simply to render the new question page `new.ejs`
3. set a empty question variable inside the

#### Create
2. all forms actions are absolute to the app root path '/' not relative
3. the data that comes through the form come through on `req.body` using the 'name' attributes of the input fields. `req.body.title` will take the value in the 'title' field attrubtute box.

# One to Many Express

#### Set Up Child Model for Questions
1. create a model for answers that associates with questions `sequelize model:create --name Answer --attributes content:text,QuestionId:integer` in database. Question parent association must be capitalized with Id on the end and type integer for setting up foreign key
2. check out migration and find the QuestionId entry and set up the references which specify which table is the parent and which column in the parent table is the foreign key
  ```javascript
  QuestionId: {
        type: Sequelize.INTEGER,
        // here is where we set up parent associations for the answer model
        references: {
          // the model property take s a string that is the table name that this foreign key refers to
          model: 'Questions',
          // the key property takes a string of the colum that holds the foreign key in the table named above
          key: 'id'
        },
        onDelete: 'cascade', // similar to rails 'dependent: :destroy' for child tables
        onUpdate: 'cascade',
        allowNull: false // won't allow a an answer to be created without a parent question
      },
  ```
3. run migration `sequelize db:migrate`
4. check the table in postgres `psql -d databasename` `\d "Tablename"`
5. set up association itself in `models/answer`. This will give the methods to
  ```javascript
  Answer.associate = function({Question}){
    Answer.belongsTo(Question)
  }
  ```
  * Answer#setQuestion
    Answer#getQuestion

6. do the same on parent question model
  ```javascript
  Question.associate = ({Answer}) => {
      Question.hasMany(Answer)
    }
  ```
  * Question#getAnswers
    Question#setAnswers
    Question#addAnswer
  * find a question and add an answer to it `Question.findById(2).then(question => question.addAnswer(answer))`

#### Set up Seeds for Answers
1. Create seed file for answers `sequelize seed:create --name create-answers`
2. when declaring a funciton with the keyword 'async', we can use the keyword 'await' inside its body to wait for the resolved valude of a promise and assign to  variables
3. add in required modules at top of page `const faker = require('faker')` and `const {Question, Answer} = require('../models')`
3. set up seed to
  ```javascript
  up: async (queryInterface, Sequelize) => {
    const questions = await Question.all();

    for (let question of questions) {
      // Create up to 5 answers for every question and associate them
      for (let i = 0, max = random(6); i <= max; i += 1) {
        await Answer.create({
          content: faker.lorem.paragraph(),
          QuestionId: question.id
        });
      }
    }
  },
  ```
4. set down seet to
  ```javascript
  down: async (queryInterface, Sequelize) => {
    await Answer.destroy({where: {}});
  }
  ```
4. undo seeds first `sequelize db:seed:undo:all` and then run seed `sequelize db:seed:all`
5. check in postgres `psql -d aae_dev` `select * from 'Answers';`

# Display Questions Show
1. require Ansers model in questions controller `const {Question, Answer} = require('../models`
2. questions router change questions#show to include
  ```javascript
  router.get('/:id', (req, res, next) => {
  // to get params from Express, use 'req.params' as its a property of the request object. it doesn't contain form data. only params related to the path. example, 'id' 'question_id' etc.
  const {id} = req.params
  Question
    .findById(id, {include: [ {model: Answer} ] })
    .then(question => {
      // res.send(question)
      res.render('questions/show', {question, answers: question.Answers})
    })
    .catch(error => next(error))
    // .catch(next) same as above
  })
  ```

# Save an Answer
1. create a form on the questions page with action post to `/questions/id/answers`
2. create new route file `routes/answers.js`
3. set up answers route file
4. add answers

# Fix Order in Sequlize
1. for questions order, add in after `.all({order: [['createdAt', 'DESC'], ['title', 'asc']]})` will query `select * from 'Questions' order by 'createdAt' desc, 'title' asc;`
2. for answers add in `order: [ [Answer, 'createdAt', 'DESC'] ]`

# Destroy Methods
1. html forms can only support get and post so we need to add form with to modify the action
  ```html
  <form class="" action="/questions/<%= question.id %>" method="post">
    <input type="hidden" name="_method" value="DELETE">
    <input type="submit" name="" value="Delete Question">
  </form>
  ```
2. add method-override `yarn add method-override`
3. in `app.js` add in to the top of the app add require the modules `const methodOverride = require('method-override')`
4. add in custom methodOverride middleware after `app.use(bodyParser.urlencoded({ extended: false }));`
  ```javascript
  app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
  }))
  ```
