const Express = require('express')
const router = Express.Router();


router.get(['/', '/home'], (request, response) => {
  response.render('home')
})

// router.get('/new', (request, response) => {
//   response.render('cohorts/new')
// })

router.get('/show', (request, response) => {
  response.render('show')
})
// router.get('/cohorts_id', (request, response) => {
//   response.render('cohorts_id')
// })

// app.post('/cohorts_id', function(request, response) => {
//
// })

//
// router.get('/hello', (request, response) => {
//
//   response.send(`Hello, Class!`)
// })


module.exports = router;
