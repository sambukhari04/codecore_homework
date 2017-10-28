
const Express = require('express')
const multer = require('multer')
const path = require('path')
const router = Express.Router()
const kx = require('../db/connections')


const upload = multer({dest: path.join(__dirname, '..', 'public', 'uploads')})






router.get('/new', (request, response) => {
  response.render('cohorts/new')
})

router.get('/:id', (request, response) => {
  const {id} = request.params

  kx
    .first()
    .from('cohorts')
    .where({id})
    .then(cohort => {
      response.render('cohorts/show', {cohort})
    })

})

router.get('/', (request, response) => {
 kx
   .select()
   .from('cohorts')
   .orderBy('created_at', 'DESC')
   .then(cohorts => {
     response.render('cohorts', {cohorts})
   })
})

// CREATE -> CREATE URL: /posts/ METHOD: POST
router.post('/', upload.single('photo'), (request, response) => {
  if (request.file) {
    const {body} = request;

    const {name, members} = request.body;
    const {filename} = request.file;

    kx
      .insert({name: name, members: members, logo_url: `/uploads/${filename}` })
      .into('cohorts')
      .then(() => response.redirect('/cohorts'))
  } else {
    console.log("validation error")
    response.render('cohorts/new')
  }



})


module.exports = router;
