const kx = require('knex')({
  client: 'pg',
  connection: {
    database: 'cohorts'
  }
})

// kx.on('query', query => {
//   console.log(query.sql)
//   console.log(query.binding)
// })
module.exports = kx
