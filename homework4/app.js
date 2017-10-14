const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const welcome = require('./routes/index');


//setting up routes
const cohorts = require('./routes/cohorts')
const index = require('./routes/index')

const app = express()

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('/cohorts', cohorts)

const PORT = 5525;
app.listen(
  PORT,
  () =>
	console.log(`😛 Server listening on http://localhost:${PORT}`)
);



  // app.set('view engine', 'ejs'); // configures Express application to use the `ejs` templating language
  // app.use(Express.static(path.join(__dirname, 'public'))); // To serve images, css, javascript, sounds & videos to a client
  // app.use(bodyParser.urlencoded({extended: false})); // to use body parser
  // app.use(morgan('dev')); // to use morgan
  // app.use('/', welcome);  // when we get '/' to use 'index.js'
  //
  // const PORT = 5000; // STUP PORT: @ end of file.
  // app.listen(
  //   PORT,
  //   () => console.log(`💻 Server listening on http://localhost:5000`)
  // );
